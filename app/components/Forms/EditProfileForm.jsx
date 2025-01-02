'use client'
import { Box, useToast } from '@chakra-ui/react';
import React, {useState, useEffect, useMemo} from 'react'
import { LoaderIcon } from '../IconComponent';
import { blurDataUrl, modules } from '../../lib/constants';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { capitalize, hostUrl } from '../../lib/utilFunctions';
import { uploadFile } from '../../utils/common';
import axios from 'axios';

const EditProfileForm = ({user, fetchData}) => {
    const [isSaving, setIsSaving] = useState(false);
    const [file, setFile] = useState(user?.avatar??'/images/avatar-1.png');
    const [fileUrl, setFileUrl] = useState(user?.avatar??'/images/avatar-1.png');
    const [bio, setBio] = useState(user?.profile?.bio??'');
    const [inputs, setInputs] = useState({
        orcid: user?.profile?.orcid??'',
        homepage: user?.profile?.homepage??'',
    });
    const chakraToast = useToast();
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { 
        ssr: false,
          loading: () => <div className="border border-[#464849] h-72 animate-pulse bg-gray-100" />
    }), []);

    const handleChange = (e) => {
        setInputs((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file); // Create a URL for the file
            setFileUrl(fileUrl);
            setFile(file);
            console.log(file, 'file')
        } else {
            // setFileName("");
        }
    };

    const handleValidation = () => {
        const { password, apassword, cpassword} = inputs;
        if (password == '' && apassword == '' && cpassword == '') {
          toaster('Fill in all required fields', 'error');
          setIsSaving(false);
          return false;
        } else if (password === '') {
          toaster('Fill in all required fields', 'error');
          setIsSaving(false);
          return false;
        } else if (apassword === '') {
          toaster('Fill in all required fields', 'error');
          setIsSaving(false);
          return false;
        } else if (cpassword === '') {
          toaster('Fill in all required fields', 'error');
          setIsSaving(false);
          return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
    
        // if (handleValidation()) {
          try {
            const { orcid, homepage } = inputs;
    
            var payload = {
                orcid, 
                homepage, 
                bio,
            };
    
            const downloadURL = await uploadFile(file);
    
            if (downloadURL)
              payload.avatar = downloadURL;
    
            const res = await axios.post(hostUrl + 'users/update-user-profile/'+user?.id,
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
            }

            setIsSaving(false);
          } catch (err) {
            toaster(err?.response?.data?.message??'An Error Occurred', 'error');
            setIsSaving(false);
          }
        // }
        // setIsSaving(false);
    
    };

    const handleDeleteAvatar = async (e) => {
        e.preventDefault();
        // setIsSaving(true);
    
        // if (handleValidation()) {
          try {
            const res = await axios.post(hostUrl + 'users/delete-user-avatar/'+user?.id);

            if (res.data.error) {
                toaster(res?.data?.message??"An Error Occured", 'error');
            } else if (res.data.success) {
                // const existingUser = JSON.parse(localStorage.getItem('ojs-user')) || {};
                // const updatedUser = { ...existingUser, ...res.data.user };
                // localStorage.setItem('ojs-user', JSON.stringify(updatedUser));

                toaster(res?.data?.message??"Successfully Updated", 'success');
                fetchData();
            }

            // setIsSaving(false);
          } catch (err) {
            console.log(err)
            toaster(err?.response?.data?.message??'An Error Occurred', 'error');
            // setIsSaving(false);
          }
        // }
        // setIsSaving(false);
    
    };


    return (
        <>
            <form>
                


                <div className="mb-4 flex flex-col gap-1">
                    <div className="rounded-t relative  overflow-hidden">
                        {/* {file} */}
                        <Image 
                            src={fileUrl} 
                            alt={'alt'} 
                            className="size-52 object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105" 
                            height={200}
                            width={400}
                            quality={100}
                            sizes="(max-width: 768px) 100vw, 800px"
                            placeholder="blur"
                            blurDataURL={blurDataUrl}
                        />
                    </div>

                    <div className='flex items-center gap-2'>
                        <button onClick={handleDeleteAvatar}
                            className='btn-danger p-3 h-10 flex items-center justify-center rounded text-sm'>
                            Delete
                        </button>

                        <div className="">
                            <label
                            htmlFor="image" className='btn-primary p-3 h-10 rounded text-sm cursor-pointer'>
                                Upload
                            </label>
                            <input
                                type="file"
                                id="image"
                                className="px-2 py-4 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border border-dashed bg-transparent  h-full rounded-md focus:outline-0 text-center flex items-center justify-center hidden"
                                name="image"
                                required
                                accept=".png, .jpg"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-4 flex flex-col gap-1">
                    <label className="text-sm font-semibold" htmlFor="bio">
                        Bio
                    </label>
                    <div>
                        <ReactQuill
                            theme="snow"
                            required
                            modules={modules}
                            name="bio"
                            value={bio}
                            // onChange={handleChange}
                            onChange={(value) => {
                                setBio(value);
                            }}
                            className="border border-[#464849] h-auto min-h-40"
                            style={{minHeight: '228px'}}
                        />
                    </div>
                </div>
            

                <div className="mb-4 flex flex-col gap-1">
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

                <div className="mb-4 flex flex-col gap-1">
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

export default EditProfileForm
