import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { _getUser, fetchProjectsById } from '../../lib/utilFunctions';
import { LoaderIcon } from '../IconComponent';
import { permissionLevelList } from '../../lib/constants';
import { Check } from 'iconsax-react';

const EditUserForm = ({
  onClose,
  dataSource,
  currentUser,
  setDataSource,
  setCurrentUser,
}) => {
  const [user, setUser] = useState(null);
  const [showRoles, setShowRoles] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const [inputs, setInputs] = useState({
    fname: currentUser?.fname??'',
    lname: currentUser?.lname??'',
    username: currentUser?.username??'',
    email: currentUser?.email??'',
    roles: currentUser?.roles ?? [],
  });

  console.log(currentUser, 'currentUser')
  // const [isLoading, setIsLoading] = useState(false);
  // const [isSaving, setIsSaving] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const token = localStorage.getItem('accessProjectUserToken');
  //     const isLoggedIn = token !== null;

  //     if (!isLoggedIn) {
  //       router.push('/auth/login');
  //       return;
  //     }

  //     try {
  //       const user = await _getUser();
  //       if (!user) {
  //         throw new Error('Failed to fetch user');
  //       }
  //       setUser(user);
  //     } catch (error) {
  //       console.error(error);
  //       router.push('/auth/login');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, [router, _getUser]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleRoleChange = (roleId) => {
    setInputs((prev) => {
      const roles = prev.roles.includes(roleId)
        ? prev.roles.filter((role) => role !== roleId)
        : [...prev.roles, roleId];
      return { ...prev, roles };
    });
  };

  const handleValidation = () => {
    const { fname, lname, username, email, roles } = inputs;
    console.log(inputs, 'jjj')
    if (fname === '' && lname === '' && username === '' && email === '') {
      toast.error('Fill in all required fields');
      setIsSaving(false);
      return false;
    } else if (fname === '') {
      toast.error('First Name is required');
      setIsSaving(false);
      return false;
    } else if (lname === '') {
      toast.error('Last Name is required');
      setIsSaving(false);
      return false;
    } else if (username === '') {
      toast.error('Username is required');
      setIsSaving(false);
      return false;
    } else if (email === '') {
      toast.error('Email is required');
      setIsSaving(false);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    // console.log(host, inputs, 'hereee');
    // return

    if (handleValidation()) {
      try {
        // console.log(user, inputs, 'its seeing it here');
        // return
        const { fname, lname, email, username, roles } = inputs;

        var payload = {
          fname,
          lname,
          email,
          username,
          roles
        }

        const res = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/users/update-user/${currentUser?.id}`, 
          payload
        );
        // console.log(res.data, 'res.datadwfwfwfffffwefefef');

        if (res.data.error) {
          // console.log("errroooooorrrrrrrrr")
          toast.error(res.data.message);
        } else if (res.data.success) {
          const updatedColumns = dataSource.map((column) => {
            if (column.id === currentUser.id) {
              return {
                ...column,
                ...payload,
              };
            }
            return column;
          });

          setDataSource(updatedColumns);
          // console.log(columns, title, description, updatedColumns, 'momo')
          toast.success(res.data.message);
          onClose();
        }
        setIsSaving(false);
      } catch (err) {
        console.log(err, 'err')
        toast.error('An error occurred');
        setIsSaving(false);
      }
    }
  };

  const onCloseModal = () =>{
    onClose();
    setCurrentUser(null);
  }

  // console.log(status, 'status')
  return (
    <>
      <ModalBody>
        <div>
          <form>
            <div className='flex w-full gap-2'>
              <div className="mb-4 flex flex-col gap-1 w-1/2">
                <label className="text-sm" htmlFor="fname">
                  First Name
                </label>
                <input 
                  type="text"
                  className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                  name="fname"
                  id="fname"
                  required
                  placeholder="First Name"
                  value={inputs.fname}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4 flex flex-col gap-1 w-1/2">
                <label className="text-sm" htmlFor="lname">
                  Last Name
                </label>
                <input 
                  type="text"
                  className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                  name="lname"
                  id="lname"
                  required
                  placeholder="Last Name"
                  value={inputs.lname}
                  onChange={handleChange}
                />
              </div>

            </div>


            <div className="mb-4 flex flex-col gap-1">
              <label className="text-sm" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={inputs.username}
                onChange={handleChange}
                placeholder="Username"
                className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 w-full"
              />
            </div>

            <div className="mb-4 flex flex-col gap-1">
              <label className="text-sm" htmlFor="email">
                Email
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

            <div>
                <div className='mb-2'>
                  <h3 className='font-semibold text-base '>Roles To Assign</h3>
                </div>

              <div className='min-h-0'>
                  
                  {permissionLevelList.map((level) => (
                    <div key={level.id} className="mb-2">
                      <label className="flex items-center gap-2 border py-3 px-3 rounded cursor-pointer hover:bg-[#F3F4F6] text-sm">
                        <input
                          type="checkbox"
                          checked={inputs.roles.includes(level.id)}
                          onChange={() => handleRoleChange(level.id)}
                        />
                        {level.title}
                      </label>
                    </div>
                  ))}
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

export default EditUserForm;
