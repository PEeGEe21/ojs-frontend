'use client'
import { Box, useToast } from '@chakra-ui/react';
import React, {useState, useEffect} from 'react'
import { LoaderIcon } from '../IconComponent';
import { Eye, EyeSlash, Refresh } from 'iconsax-react';
import { capitalize, getGeneratedPassword, hostUrl } from '../../lib/utilFunctions';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';
import { logout } from '../../utils/common';


const EditPasswordForm = ({user, fetchData}) => {
    const [isSaving, setIsSaving] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [showCuPassword, setShowCurrentPassword] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [inputs, setInputs] = useState({
        password: '',
        apassword: '',
        cpassword: '',
    });
    const router = useRouter();
    const chakraToast = useToast();

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

    const showConfirmPassword = () =>{
        setShowCPassword(!showCPassword)
    }
      
    const showAPassword = () =>{
        setShowPassword(!showPassword)
    }

    const showCurrentPassword = () =>{
        setShowCurrentPassword(!showCuPassword)
    }

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

    const generateRandomPassword = () => {
        setIsGenerating(true)
        let password = getGeneratedPassword();
    
        setInputs((prevInputs) => ({
          ...prevInputs,
          apassword: password,
          cpassword: password,
        }));
        toaster('Generated Password Successfully', 'success');
    
        setTimeout(()=>{
          setIsGenerating(false);
        }, 200)
    };


    const handleLogOut = () => {
      logout();
      router.push('/auth/login');
      toast.success('Successfully logged out')
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSaving(true);
      if (handleValidation()) {
        try {
          const { password, apassword, cpassword } = inputs;
  
          var payload = {
            password, 
            apassword,
            cpassword
          }
  
          if(user){
    
            const res = await axios.post(`${hostUrl}users/update-user-password/${user?.id}`, 
              payload
            );
  
            console.log(res, 'sdsd')
            if (res.data.error) {
              toaster(res?.data?.message??"An Error Occured", 'error');
            } else if (res?.data?.success) {
              toaster(res?.data?.message??"Successfully Updated", 'success');
              fetchData();
              handleLogOut();
            }

          } 
          setIsSaving(false);
        } catch (err) {
          console.log(err)
          toaster(err?.response?.data?.message??'An Error Occurred', 'error');
          setIsSaving(false);
        }
      }
    };

    return (
        <>
            <form className='space-y-8'>

                <div className="mb-4 flex flex-col gap-1">
                    <label className="text-sm font-semibold" htmlFor="password">
                        Current Password
                    </label>
                    <div className=" relative rounded-full  items-center w-full">
                      <button onClick={showCurrentPassword} type="button" className="absolute inset-y-0 right-0 flex items-center h-full cursor-pointer focus:outline-none">
                        <span className="text-[#BEBDBD] px-3">
                          {showCuPassword ? <EyeSlash size={22}/> : <Eye size={22}/>}
                        </span>
                      </button>
                      <input 
                        type={showCuPassword ? "text" : "password"}
                        className=" block min-w-full border border-gray-400 focus:border-gray-500 h-10  w-full  focus:outline-0 bg-transparent rounded px-2 pr-10 text-sm"
                        name="password"
                        id="password"
                        required
                        placeholder="Password"
                        value={inputs.password}
                        onChange={handleChange}
                      />
                    </div>
                </div>


                <div className='mt-5'>
                  <div className='mb-3'>
                    <h4 className='text-base font-semibold'>New password</h4>
                  </div>
                  <div className='flex flex-col w-full gap-2'>
                      <div className=" flex flex-col gap-1 w-full">
                        <label className="text-sm font-semibold" htmlFor="apassword">
                          Password
                        </label>
                        <div className=" relative rounded-full  items-center w-full">
                          <button onClick={showAPassword} type="button" className="absolute inset-y-0 right-0 flex items-center h-full cursor-pointer focus:outline-none">
                            <span className="text-[#BEBDBD] px-3">
                              {showPassword ? <EyeSlash size={22}/> : <Eye size={22}/>}
                            </span>
                          </button>
                          <input 
                            type={showPassword ? "text" : "password"}
                            className=" block min-w-full border border-gray-400 focus:border-gray-500 h-10  w-full  focus:outline-0 bg-transparent rounded px-2 pr-10 text-sm"
                            name="apassword"
                            id="apassword"
                            required
                            placeholder="Password"
                            value={inputs.apassword}
                            onChange={handleChange}
                          />
                        </div>
                        
                      </div>
      
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm font-semibold" htmlFor="cpassword">
                          Confirm Password
                        </label>
      
                        <div className=" relative rounded-full  items-center w-full">
                          <button onClick={showConfirmPassword} type="button" className="absolute inset-y-0 right-0 flex items-center h-full cursor-pointer focus:outline-none">
                            <span className="text-[#BEBDBD] px-3">
                              {showCPassword ? <EyeSlash size={22}/> : <Eye size={22}/>}
                            </span>
                          </button>
      
                          <input 
                            type={showCPassword ? "text" : "password"}
                            className="block min-w-full border border-gray-400 focus:border-gray-500 h-10 w-full focus:outline-0 bg-transparent rounded px-2 pr-10 text-sm"
                            name="cpassword"
                            id="cpassword"
                            required
                            placeholder="Confirm Password"
                            value={inputs.cpassword}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className='flex flex-col gap-1 '>
                        <button type='button' onClick={generateRandomPassword} className='bg-gray-600 h-10 w-10 px-2 rounded text-white flex items-center justify-center gap-2'>
                          {isGenerating ? <LoaderIcon
                              extraClass="text-white h-5 w-5"
                              className="animate-spin "
                            />: <Refresh size={16}/>
      
                          }
                        </button> 
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

export default EditPasswordForm
