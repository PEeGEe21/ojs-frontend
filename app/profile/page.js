'use client';
import { Box, Progress, Tab, TabIndicator, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast, Tooltip } from "@chakra-ui/react";
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ArrowLeft, DocumentDownload, Trash, Eye } from 'iconsax-react'
import { useParams, useRouter } from 'next/navigation'
import axios from "axios";
import { hostUrl } from "../lib/utilFunctions";
import EditIdentityForm from '../components/Forms/EditIdentityForm';
import EditContactProfileForm from '../components/Forms/EditContactProfileForm';
import EditProfileForm from '../components/Forms/EditProfileForm';
import EditPasswordForm from '../components/Forms/EditPasswordForm';
import toast from "react-hot-toast";
import "react-quill-new/dist/quill.snow.css";


const Profile = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [user, setUser] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const router = useRouter();
      
    useEffect(()=>{
        const getLoggedInUser = async ()=>{
            try{
                if (localStorage.getItem('ojs-user')){
                    const data = await JSON.parse(
                        localStorage.getItem("ojs-user")
                    );
                    setLoggedInUser(data)
                    await getUser();
                }else{
                    router.push("/auth/login")
                }
            }catch(err){}
        };
        getLoggedInUser()
    }, [])

    const getUser = async ()=>{
        if(loggedInUser){
            try{
                setUser(null)                
                    const resp = await axios.get(hostUrl + 'users/'+loggedInUser?.id)
                    if(resp.data.success){
                        setUser(resp.data.user)
                    } else{
                        toast.error('An Error Occurred')
                    }
            }catch(err){
                // console.log(err)
                toast.error('An Error Occurred')
            }
        }

    }

    useEffect(()=>{
        getUser();
    }, [loggedInUser])

    return (
        <>
            <div className="flex flex-row items-center justify-start gap-4 mb-8 flex-wrap lg:flex-nowrap">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 w-auto whitespace-nowrap py-2 px-3 bg-[#313131] text-white rounded-md"
                >
                    <ArrowLeft />
                </button>

                <div className="w-full">
                    <h1 className="font-bold text-2xl capitalize"> Profile</h1>
                </div>
            </div>

            <div className="py-2 mb-5 rounded-lg">
                <div className="relative w-full py-4 shadow-box">
                    <Tabs position="relative" variant="unstyled" isLazy>
                        <TabList className="whitespace-nowrap gap-3 text-sm">
                            <Tab 
                                onClick={getUser}
                                className=" border-[#3B3939] text-[#313131] "
                                _hover={{ color: "#FFFFFF", backgroundColor:"#313131",  borderTop:"1px", borderTopColor: "#FFF" }}
                                _selected={{ color: "#313131", backgroundColor:"#FFFFFF", borderTop:"1px", borderTopColor: "#0F1B2D"}}
                            >
                                <span className="py-2 min-w-[100px]">
                                    Identity
                                </span>
                            
                            </Tab>
                            <Tab 
                                onClick={getUser}
                                className=" border-[#3B3939] text-[#313131]"
                                _hover={{ color: "#FFFFFF", backgroundColor:"#313131",  borderTop:"1px", borderTopColor: "#FFF" }}
                                _selected={{ color: "#313131", backgroundColor:"#FFFFFF", borderTop:"1px", borderTopColor: "#0F1B2D"}}
                            >
                                
                                <span className="py-2  min-w-[100px]">
                                    Contact
                                </span>
                            </Tab>
                            <Tab 
                                onClick={getUser}
                                className=" border-[#3B3939] text-[#313131]"
                                _hover={{ color: "#FFFFFF", backgroundColor:"#313131",  borderTop:"1px", borderTopColor: "#FFF" }}
                                _selected={{ color: "#313131", backgroundColor:"#FFFFFF", borderTop:"1px", borderTopColor: "#0F1B2D"}}
                            >
                                
                                <span className="py-2  min-w-[100px]">
                                    Public
                                </span>
                            </Tab>
                            <Tab 
                                onClick={getUser}
                                className=" border-[#3B3939] text-[#313131]"
                                _hover={{ color: "#FFFFFF", backgroundColor:"#313131",  borderTop:"1px", borderTopColor: "#FFF" }}
                                _selected={{ color: "#313131", backgroundColor:"#FFFFFF", borderTop:"1px", borderTopColor: "#0F1B2D"}}
                            >
                                
                                <span className="py-2  min-w-[100px]">
                                    Password
                                </span>
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel className="px-0 py-0">
                                <div>
                                    <div className="bg-white min-h-[500px] p-4">
                                        <div className="max-w-4xl mx-auto py-5">
                                            {user &&(
                                            <EditIdentityForm user={user} fetchData={getUser}/>)}
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className="px-0 py-0">
                                <div>
                                    <div className="bg-white min-h-[500px] p-4">
                                    <div className="max-w-4xl mx-auto py-5">
                                            {user &&(
                                            <EditContactProfileForm user={user} fetchData={getUser}/>)}
                                        </div>  
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className="px-0 py-0">
                                <div>
                                    <div className="bg-white min-h-[500px] p-4">
                                    <div className="max-w-4xl mx-auto py-5">
                                            {user &&(
                                            <EditProfileForm user={user} fetchData={getUser}/>)}
                                        </div>  
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className="px-0 py-0">
                                <div>
                                    <div className="bg-white min-h-[500px] p-4">
                                    <div className="max-w-4xl mx-auto py-5">
                                            {user &&(
                                            <EditPasswordForm user={user} fetchData={getUser}/>)}
                                        </div>  
                                    </div>
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
        </>
    )
}

export default Profile
