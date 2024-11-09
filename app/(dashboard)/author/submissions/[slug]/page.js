"use client"
import React, {useState, useMemo, useEffect} from 'react'
import { Progress, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, useToast, Box } from "@chakra-ui/react";
import "react-quill-new/dist/quill.snow.css";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { ArrowLeft } from 'iconsax-react';
import { TagField } from '../../../../components/TagField';
import useTags  from '../../../../hooks/useTags';
import { hostUrl } from '../../../../lib/utilFunctions';
import { modules, styles } from '../../../../lib/constants';


const SingleSubmission = () => {
    const [pageTitle, setPageTitle] = useState("");
    const [user, setUser] = useState(null);
    const [uploads, setUploads] = useState([]);
    const [currentUpload, setCurrentUpload] = useState(null);
    const [editorNote, setEditorNote] = useState('');
    const [title, setTitle] = useState("");
    const [prefix, setPrefix] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [abstract, setAbstract] = useState("");
    const [addressError, setAddressError] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const router = useRouter();

    const params = useParams();
    const { slug } = params;    
    const id = slug;
    


    const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { 
        ssr: false,
        loading: () => <div className="border border-[#464849] h-72 animate-pulse bg-gray-100" />
    }), []);
    
    const MAX_TAGS = 10;

    const { tags, handleAddTag, handleRemoveTag } = useTags(MAX_TAGS); // pass the maximum tags

    useEffect(()=>{
        if(id){
            setPageTitle('Update');
        }
    }, [id]);


    useEffect(()=>{
        const fetchData = async () => {
            if (id) {
                try {
                    const res = await fetch(hostUrl + `submissions/${id}`);
                    if (res.ok) {
                        const data = await res.json();
                        const result = data.submission
                        // console.log(result)

                        setIsEditing(true);
                        setTitle(result.title);
                        setPrefix(result.prefix);
                        setSubTitle(result.subTitle);
                        setAbstract(result.abstract);
                    } else {
                        throw new Error('Failed to fetch the submission');
                    }
                } catch (err) {
                    console.error('Error fetching data:', err?.message);
                }
            } else {
                setIsEditing(false);
                resetForm();
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <div>
                <div className="flex flex-row items-center justify-start gap-4 mb-8">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex items-center gap-2 w-auto whitespace-nowrap py-2 px-3 bg-[#313131] text-white rounded-md"
                    >
                        <ArrowLeft />
                    </button>

                    <div className="w-full">
                        <h1 className=" whitespace-nowrap font-bold text-2xl">Submission</h1>
                    </div>
                </div>


                <div className="mt-8">

                    <div className="py-2 mb-5 rounded-lg">
                        <div className="relative w-full py-4 shadow-box">
                        <Tabs position="relative" variant="unstyled" isLazy>
                            <TabList className="whitespace-nowrap gap-3 text-sm">
                            <Tab
                                className=" border-[#3B3939] text-[#313131] "
                                _hover={{ color: "#FFFFFF", backgroundColor:"#313131",  borderTop:"1px", borderTopColor: "#FFF" }}
                                _selected={{ color: "#313131", backgroundColor:"#FFFFFF", borderTop:"1px", borderTopColor: "#0F1B2D"}}
                            >
                                <span className="py-2 min-w-[150px]">
                                Details
                                </span>
                            
                            </Tab>

                            <Tab
                                className=" border-[#3B3939] text-[#313131] "
                                _hover={{ color: "#FFFFFF", backgroundColor:"#313131",  borderTop:"1px", borderTopColor: "#FFF" }}
                                _selected={{ color: "#313131", backgroundColor:"#FFFFFF", borderTop:"1px", borderTopColor: "#0F1B2D"}}
                            >
                                <span className="py-2 min-w-[150px]">
                                    Submission Files
                                </span>
                            
                            </Tab>
                            </TabList>
                            <TabPanels>
                            <TabPanel className="px-0 py-0">
                                <div>
                                    <div className="bg-white px-3 md:px-6 py-3 md:py-6 rounded-lg min-h-[500px]">
                                        <div className="mt-3 lg:mt-6">
                                            <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                                                <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                                    <label
                                                        htmlFor="prefix"
                                                        className="text-sm text-[#212121] semibold"
                                                    >
                                                        Prefix
                                                    </label>

                                                    <input
                                                        type="text"
                                                        id="prefix"
                                                        value={prefix}
                                                        onChange={(e) => {
                                                            console.log("checkSum");
                                                            setAddressError(false);
                                                            setPrefix(e.target.value);
                                                        }}
                                                        className={`block px-2 w-full text-sm text-[#212121]  ${
                                                            addressError === true
                                                                ? "border-red-500"
                                                                : " focus:outline-none border-[#524F4D]"
                                                        }  border bg-transparent  h-12 rounded-md focus:outline-0`}
                                                        name="prefix"
                                                        placeholder="e.g A, The"
                                                        autoComplete="off"
                                                    />
                                                    {/* <span className="helper text-xs">Example: A, The</span> */}
                                                </div>

                                                <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-3/4">
                                                    <label
                                                        htmlFor="title"
                                                        className="text-sm text-[#212121] semibold"
                                                    >
                                                        Title
                                                    </label>

                                                    <input
                                                        type="text"
                                                        id="title"
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        className="block px-2 w-full text-sm text-[#212121] focus:outline-none border-[#524F4D]  border bg-transparent  h-12 rounded-md focus:outline-0"
                                                        placeholder="e.g Title"
                                                        name="title"
                                                        autoComplete="off"
                                                    />
                                                    {/* <span className="helper text-xs">&nbsp;</span> */}
                                                </div>
                                            </div>
                                            
                                            <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                                                <div className="mb-6 flex flex-col gap-1 relative w-full">
                                                    <label
                                                        htmlFor="sub_title"
                                                        className="text-sm text-[#212121] semibold"
                                                    >
                                                        Subtitle
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="sub_title"
                                                        value={subTitle}
                                                        onChange={(e) => setSubTitle(e.target.value)}
                                                        className="block px-2 w-full text-sm text-[#212121] focus:outline-none border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                        name="sub_title"
                                                        autoComplete="off"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="mb-6 flex flex-col gap-1 relative w-full">
                                                    <label 
                                                        htmlFor="airdrop_title"
                                                        className="text-sm text-[#212121] semibold ">
                                                        Abstract
                                                    </label>
                                                    <ReactQuill
                                                        theme="snow"
                                                        required
                                                        value={abstract}
                                                        modules={modules}
                                                        style={styles}
                                                        onChange={(value) => {
                                                            setAbstract(value);
                                                            console.log(editorNote)
                                                        }}
                                                        className="border border-[#524F4D] h-auto min-h-72"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                                                <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                                    <label
                                                        htmlFor="name"
                                                        className="text-sm text-[#212121] mb-1"
                                                    >
                                                        KeyWords
                                                    </label>

                                                    <TagField
                                                        tags={tags}
                                                        addTag={handleAddTag}
                                                        removeTag={handleRemoveTag}
                                                        maxTags={MAX_TAGS}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <Box mt={4}>
                                        <div className="flex items-center justify-center w-full gap-3 flex-wrap">
                                            <button
                                                className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] whitespace-nowrap w-full md:w-auto
                                                disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                                transition-all duration-75 border-none px-5 
                                                font-medium p-3 text-base text-white block">
                                                Save
                                            </button>
                                        </div>
                                    </Box>
                                </div>

                            </TabPanel>
                            <TabPanel className="px-0 py-0">
                                <div>
                                <div className="bg-white min-h-[500px]">


                                    {/* <MySubmissions/> */}
                                    {/* <AllSubmissions
                                    searchQuery={searchQuery}
                                    // viewType={viewType}
                                    /> */}
                                </div>
                                </div>

                            </TabPanel>
                            </TabPanels>
                        </Tabs>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SingleSubmission
