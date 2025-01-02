'use client'
import { Box, useToast } from '@chakra-ui/react';
import React, {useState, useEffect} from 'react'
import { LoaderIcon } from '../IconComponent';
import axios from 'axios';
import { capitalize, hostUrl } from '../../lib/utilFunctions';
import toast from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';
import { logout } from '../../utils/common';

const EditIdentityForm = ({user, fetchData}) => {
    const [isSaving, setIsSaving] = useState(false);

    const [inputs, setInputs] = useState({
        firstname: user?.firstname??'',
        lastname: user?.lastname??'',
        username: user?.username??'',
        public_name: user?.public_name??'',
    });
    const chakraToast = useToast();
    const router = useRouter();

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
        const { firstname, lastname } = inputs;
        if (firstname == '' && lastname == '') {
          toaster('Fill all required fields', 'error');
          setIsSaving(false);
          return false;
        } 
        else if (firstname == '') {
          toaster('First Name is required', 'error');
          setIsSaving(false);
          return false;
        }
        else if (lastname == '') {
          toaster('First Name is required', 'error');
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
            const { firstname, lastname, public_name  } = inputs;
    
            var payload = {
                firstname, 
                lastname, 
                public_name 
            };

            const res = await axios.post(hostUrl + 'users/update-user-identity-profile/'+user?.id,
              payload
            );

            if (res.data.error) {
                toaster(res?.data?.message??"An Error Occured", 'error');
            } else if (res.data.success) {

                const existingUser = JSON.parse(localStorage.getItem('ojs-user')) || {};
                const updatedUser = { ...existingUser, ...payload };
                localStorage.setItem('ojs-user', JSON.stringify(updatedUser));

                toaster(res?.data?.message??"Successfully Updated", 'success');
                fetchData();
                // handleLogOut();
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
                    <label className="text-sm font-semibold" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={inputs.username}
                        onChange={handleChange}
                        readOnly
                        placeholder="Username"
                        className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 w-full cursor-not-allowed"
                    />
                </div>

                <div className="mb-4 flex flex-col gap-1">
                    <label className="text-sm font-semibold" htmlFor="public_name">
                        Public Name
                    </label>
                    <input
                        type="text"
                        id="public_name"
                        name="public_name"
                        value={inputs.public_name}
                        onChange={handleChange}
                        // placeholder="Username"
                        className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 w-full"
                    />
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

export default EditIdentityForm
