'use client'
import { Box, useToast } from '@chakra-ui/react';
import React, {useState, useEffect, useMemo} from 'react'
import { LoaderIcon } from '../IconComponent';
import { modules } from '../../lib/constants';
import dynamic from 'next/dynamic';
import { capitalize, hostUrl } from '../../lib/utilFunctions';
import axios from 'axios';
import { Danger } from 'iconsax-react';
import { logout } from '../../utils/common';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';


const EditContactProfileForm = ({user, fetchData}) => {
    const [isSaving, setIsSaving] = useState(false);
    const [mailingAddress, setMailingAddress] = useState(user?.profile?.mailing_address??'');
    const [inputs, setInputs] = useState({
        email: user?.email??'',
        // mailing_address: user?.mailing_address??'',
        phonenumber: user?.profile?.phonenumber??'',
        affiliation: user?.profile?.affiliation??'',
    });
    const chakraToast = useToast();
    const router = useRouter();
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { 
        ssr: false,
          loading: () => <div className="border border-[#464849] h-72 animate-pulse bg-gray-100" />
    }), []);

    const handleChange = (e) => {
        setInputs((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleLogOut = () => {
        logout();
        router.push('/auth/login');
        toast.success('Successfully logged out')
    };

    const handleValidation = () => {
        const { email} = inputs;
        if (email == '') {
          toaster('Email is required', 'error');
          setIsSaving(false);
          return false;
        }
        return true;
    };

    const toaster = (message, type) =>{
        const toast = chakraToast({
            title: message,
            description: capitalize(type),  
            status: type,
            duration: 2000,
            position: "top-right",
        });

        return toast
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
    
        if (handleValidation()) {
          try {
            const { email, phonenumber, affiliation  } = inputs;
    
            var payload = {
                email, 
                phonenumber, 
                affiliation,
                mailing_address: mailingAddress,
            };

            const res = await axios.post(hostUrl + 'users/update-user-contact-profile/'+user?.id,
              payload
            );

            if (res.data.error) {
                toaster(res?.data?.message??"An Error Occured", 'error');
            } else if (res.data.success) {

                // const existingUser = JSON.parse(localStorage.getItem('ojs-user')) || {};
                // const updatedUser = { ...existingUser, ...payload };
                // localStorage.setItem('ojs-user', JSON.stringify(updatedUser));

                toaster(res?.data?.message??"Successfully Updated", 'success');
                fetchData();
                handleLogOut();
            }

            setIsSaving(false);
          } catch (err) {
            console.log(err)
            toaster(err?.response?.data?.message??'An Error Occurred', 'error');
            setIsSaving(false);
          }
        }
        // setIsSaving(false);
    
    };


    return (
        <>
            <form>
                
                <div className="py-[18px] px-4 bg-red-200 rounded-lg mt-2 mb-4">
                    <div className="flex items-start w-full gap-2 text-red-500">
                        <span>
                            <Danger size={22} />
                        </span>
                        <p className="text-sm text-red-500">
                            You would be logged out and required to Log In if saved successfully
                        </p>
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
                    <label className="text-sm font-semibold" htmlFor="phonenumber">
                        Phone
                    </label>
                    <div>
                        <input
                            id="phonenumber"
                            type="text"
                            name="phonenumber"
                            value={inputs.phonenumber}
                            onChange={handleChange}
                            className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-1 px-2 w-full"
                        />
                    </div>
                </div>
            
                <div>

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
                        </div>
                    </div>

                    <div className="mb-4 flex flex-col gap-1">
                        <label className="text-sm font-semibold" htmlFor="mailing_address">
                            Mailing Address 
                        </label>
                        
                        <div>
                            <ReactQuill
                                theme="snow"
                                required
                                modules={modules}
                                name="mailing_address"
                                value={mailingAddress}
                                onChange={(value) => {
                                    setMailingAddress(value);
                                }}
                                className="border border-[#464849] h-auto min-h-40"
                                style={{minHeight: '228px'}}
                            />
                        </div>
                    </div>
            
                </div>


                <Box mt={4}>
                    <div className="flex items-center justify-end w-full gap-3 flex-wrap">
                        <button
                            className={`h-10  w-auto whitespace-nowrap py-2 px-3 bg-[#008080] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 ${isSaving ? 'disabled:opacity-50 disabled:cursor-not-allowed': ''}`}
                            onClick={handleSubmit}
                            disabled={isSaving}
                            aria-disabled={isSaving}
                        >
                            {isSaving ? (
                            <>
                                <LoaderIcon
                                    extraClass="text-white h-4 w-5"
                                    className="animate-spin mr-1"
                                />
                                Saving..
                            </>
                            ) : (
                                <>Save</>
                            )}
                        </button>
                    </div>
                </Box>

            </form>
        </>
    )
}

export default EditContactProfileForm
