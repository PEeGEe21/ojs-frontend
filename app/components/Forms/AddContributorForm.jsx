import React, { useEffect, useMemo, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Progress, useToast } from "@chakra-ui/react";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { _getUser, fetchProjectsById, getGeneratedPassword, hostUrl } from '../../lib/utilFunctions';
import { LoaderIcon } from '../IconComponent';
import { contributorRolesList, modules, permissionLevelList } from '../../lib/constants';
import { Check, Danger, Eye, EyeSlash, Refresh } from 'iconsax-react';
import dynamic from 'next/dynamic';

const AddContributorForm = ({
  onClose,
  submission,
  fetchData,
}) => {
  const [user, setUser] = useState(null);
  const [showRoles, setShowRoles] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [bio, setBio] = useState('');
  const [isPrincipalContact, setIsPrincipalContact] = useState(false);
  const router = useRouter();
  const [inputs, setInputs] = useState({
    firstname:'',
    lastname: '',
    email: '',
    orcid: '',
    homepage: '',
    public_name: '',
    affiliation: '',
    role: '',
  });

  const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { 
    ssr: false,
      loading: () => <div className="border border-[#464849] h-72 animate-pulse bg-gray-100" />
  }), []);

  const chakraToast = useToast();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleValidation = () => {
    const { firstname, lastname, email, role } = inputs;
    if (firstname === '' && lastname === '' && email === '' && role === '') {
      toast.error('Fill in all required fields');
      setIsSaving(false);
      return false;
    } else if (firstname === '') {
      toast.error('First Name is required');
      setIsSaving(false);
      return false;
    } else if (lastname === '') {
      toast.error('Last Name is required');
      setIsSaving(false);
      return false;
    } 
    else if (email === '') {
      toast.error('Email is required');
      setIsSaving(false);
      return false;
    }
    else if (role === '') {
      toast.error('Role is required');
      setIsSaving(false);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    if (handleValidation()) {
      try {
        const { firstname, lastname, email, orcid,
            homepage,
            public_name,
            affiliation,
            role 
        } = inputs;

        var payload = {
            firstname,
            lastname,
            email,
            role: parseInt(role),
            orcid,
            homepage,
            public_name,
            affiliation,
            bio,
            is_principal_contact: isPrincipalContact ? 1 : 0
        }

        if(submission){
          const res = await axios.post(`${hostUrl}submissions/${submission?.id}/add-contributor`, 
            payload
          );

          if (res.data.error) {
            chakraToast({
              title: res.data.message,
              description: "Error Occured",  
              status: "error",
              duration: 2000,
              position: "top-right",
            });
          } else if (res.data.success) {
            chakraToast({
              title: res.data.message,
              description: "Successfully Saved",
              status: "success",
              duration: 2000,
              position: "top-right",
            });
            fetchData();

            onClose();
          }
        }
        setIsSaving(false);
      } catch (err) {
        chakraToast({
          title: err?.response?.data?.message??'An Error Occurred',
          description: "Error Occured",  
          status: "error",
          duration: 2000,
          position: "top-right",
        });
        setIsSaving(false);
      }
    }
  };

  const onCloseModal = () =>{
    onClose();
    // setCurrentUser(null);
  }

  const allRoles = [

  ]

  // console.log(status, 'status')
  return (
    <>
      <ModalBody>
        <div>
          <form>
            <div className='flex w-full gap-2'>
              <div className="mb-4 flex flex-col gap-1 w-1/2">
                <label className="text-sm font-semibold" htmlFor="firstname">
                  First Name <span className='text-red-700'>*</span>
                </label>
                <input 
                  type="text"
                  className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                  name="firstname"
                  id="firstname"
                  required
                  placeholder="First Name"
                  value={inputs.firstname}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4 flex flex-col gap-1 w-1/2">
                <label className="text-sm font-semibold" htmlFor="lastname">
                  Last Name <span className='text-red-700'>*</span>
                </label>
                <input 
                  type="text"
                  className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                  name="lastname"
                  id="lastname"
                  required
                  placeholder="Last Name"
                  value={inputs.lastname}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="mb-4 flex flex-col gap-1">
              <label className="text-sm font-semibold" htmlFor="email">
                Email <span className='text-red-700'>*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                placeholder="Email"
                className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 w-full"
              />
            </div>

            <div className="mb-4 flex flex-col gap-1">
                
                <label className="text-sm font-semibold" htmlFor="public_name">
                    Public Name
                </label>
                
                <div>
                    <input
                        id="public_name"
                        type="text"
                        name="public_name"
                        value={inputs.public_name}
                        onChange={handleChange}
                        className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-1 px-2 w-full"
                    />
                    <p className='text-xs text-muted'>How do you prefer to be addressed? Salutations, middle names and suffixes can be added here if you would like.              </p>
                </div>
            </div>
            
            <div className='mt-4'>
                <div className='mb-2'>
                    <h3 className='font-semibold text-base '>User Details</h3>
                </div>
                <div>
                    <div className='flex w-full gap-2'>
                        <div className="mb-4 flex flex-col gap-1 w-1/2">
                            <label className="text-sm font-semibold" htmlFor="homepage">
                                Homepage URL 
                            </label>
                            <input 
                                type="text"
                                className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                                name="homepage"
                                id="homepage"
                                required
                                placeholder="Homepage URL"
                                value={inputs.homepage}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4 flex flex-col gap-1 w-1/2">
                            <label className="text-sm font-semibold" htmlFor="orcid">
                                ORCID iD
                            </label>
                            <input 
                                type="text"
                                className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                                name="orcid"
                                id="orcid"
                                required
                                placeholder="ORCID iD"
                                value={inputs.orcid}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mb-4 flex flex-col gap-1">
                        <label className="text-sm font-semibold" htmlFor="affiliation">
                            Affiliation 
                        </label>
                        
                        <div>
                            <input
                                id="affiliation"
                                type="text"
                                name="affiliation"
                                value={inputs.affiliation}
                                onChange={handleChange}
                                // placeholder="Email"
                                className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-1 px-2 w-full"
                            />
                            <p className='text-xs text-muted'>How do you prefer to be addressed? Salutations, middle names and suffixes can be added here if you would like.              </p>
                        </div>
                    </div>

                    <div className="mb-4 flex flex-col gap-1">
                        <label className="text-sm font-semibold" htmlFor="bio">
                            Bio Statement (e.g., department and rank) 
                        </label>
                        
                        <div>
                            <ReactQuill
                                theme="snow"
                                required
                                modules={modules}
                                name="bio"
                                value={bio}
                                onChange={(value) => {
                                    setBio(value);
                                }}
                                className="border border-[#464849] h-auto min-h-40"
                                style={{minHeight: '228px'}}
                            />
                        </div>
                    </div>
            
                </div>

            </div>

            <div className='mt-4'>
                <div className='mb-2'>
                    <h3 className='font-semibold text-sm '>Contributor&apos;s role <span className='text-red-700'>*</span></h3>
                </div>

                <div className='min-h-0'>
                    {contributorRolesList.map((role) => (
                        <div key={role.id} className="mb-2">
                            <div className="flex items-center justify-between gap-2 border px-3 rounded cursor-pointer hover:bg-[#F3F4F6] text-sm">
                                <label className='flex items-center gap-2 w-full cursor-pointer py-3 '>
                                <input
                                    type="radio"
                                    name="role"
                                    value={role.id}
                                    checked={inputs.role == role.id}
                                    onChange={handleChange}
                                />
                                    {role.title}
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-4'>
                <div className="p-2 w-full text-left">
                    <ul className="space-y-2">
                        <li>
                            <label htmlFor="is_principal_contact" className="flex items-center justify-start gap-3 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={isPrincipalContact} 
                                    id="is_principal_contact" 
                                    onChange={()=>{
                                        setIsPrincipalContact((prev)=>!prev)
                                    }} 
                                    name="is_principal_contact" 
                                />
                                <p className="text-[#212121] text-sm">
                                    Principal contact for editorial correspondence.
                                </p>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
          </form>
        </div>
      </ModalBody>
      <ModalFooter className="space-x-3">
        <button
          onClick={onCloseModal}
          className="h-10  w-auto whitespace-nowrap py-2 px-3 bg-rose-800 text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 "
        >
          Cancel
        </button>
        <button
          className="h-10  w-auto whitespace-nowrap py-2 px-3 bg-[#008080] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 "
          onClick={handleSubmit}
          disabled={isSaving}
          aria-disabled={isSaving}
        >
          {isSaving ? (
            <>
              <LoaderIcon
                extraClass="text-white"
                className="animate-spin mr-1"
              />
              Saving..
            </>
          ) : (
           <>Save</>
          )}
        </button>
      </ModalFooter>
    </>
  );
};

export default AddContributorForm;
