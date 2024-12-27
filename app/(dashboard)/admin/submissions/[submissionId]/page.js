"use client"
import { Box, Progress, Tab, TabIndicator, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast, Tooltip } from "@chakra-ui/react";
import UploadFileSubmissionModal from "../../../../components/Modals/UploadFileSubmissionModal"
import AssignEditorSubmissionModal from "../../../../components/Modals/AssignEditorSubmissionModal"
import AssignIssueSubmissionModal from "../../../../components/Modals/AssignIssueSubmissionModal"
import PublishSubmissionModal from "../../../../components/Modals/PublishSubmissionModal"
import UnPublishSubmissionModal from "../../../../components/Modals/UnPublishSubmissionModal"
import "react-quill-new/dist/quill.snow.css";
import { ArrowLeft, DocumentDownload, Trash, Eye } from 'iconsax-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { formatMomentDate, hostUrl } from "../../../../lib/utilFunctions";
import { getFullName } from "../../../../utils/common";
import Swal from 'sweetalert2';
import axios from "axios";
import { modules, styles } from "../../../../lib/constants";
import dynamic from "next/dynamic";
import { TagField } from "../../../../components/TagField";
import useTags from "../../../../hooks/useTags";
import { JournalContext } from "../../../../utils/journalContext";
import UpdateSubmissionIssuesForm from "../../../../components/Forms/UpdateSubmissionIssuesForm"
import UpdateSubmissionTitleForm from "../../../../components/Forms/UpdateSubmissionTitleForm"
import Link from "next/link";
import { LoaderIcon } from "../../../../components/IconComponent";

const SingleSubmission = () => {
    const { selectedJournal } = useContext(JournalContext);
    const router = useRouter();
    const [user, setUser ] = useState(null);
    const [submission, setSubmission ] = useState(null);
    const [submissionFiles, setSubmissionFiles ] = useState([]);
    const [sections, setSections ] = useState([]);
    const [uploads, setUploads ] = useState([]);
    const [users, setUsers ] = useState([]);
    const [issues, setIssues ] = useState([]);
    const [title, setTitle] = useState("");
    const [prefix, setPrefix] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [urlPath, setUrlPath] = useState("");
    const [pages, setPages] = useState("");
    const [datePublished, setDatePublished] = useState("");
    const [section, setSection] = useState("");
    const [abstract, setAbstract] = useState("");
    const [currentUpload, setCurrentUpload] = useState(null);
    const [currentViewUpload, setViewCurrentUpload] = useState(null);
    const [editors, setEditors] = useState([])
    const [userEditors, setUserEditors] = useState([])
    const [showReviews, setShowReviews] = useState(false)
    const [changeAcceptanceStatus, setChangeAcceptanceStatus] = useState(false)
    const [isSavingFileStatus, setIsSavingFileStatus] = useState({});
    const params = useParams();
    const { submissionId } = params;    
    const id = submissionId;
    let isPublishingSubmission = false;
    const {
        isOpen: uploadFileIsOpen,
        onOpen: onUploadFileOpen,
        onClose: onUploadFileClose,
    } = useDisclosure();

    const {
        isOpen: attachEditorIsOpen,
        onOpen: onAttachEditorOpen,
        onClose: onAttachEditorClose,
    } = useDisclosure();

    const {
        isOpen: assignIssueIsOpen,
        onOpen: onAssignIssueOpen,
        onClose: onAssignIssueClose,
    } = useDisclosure();

    const {
        isOpen: publishSubmissionIsOpen,
        onOpen: onPublishSubmissionOpen,
        onClose: onPublishSubmissionClose
    } = useDisclosure();

    const {
        isOpen: unPublishSubmissionIsOpen,
        onOpen: onUnPublishSubmissionOpen,
        onClose: onUnPublishSubmissionClose
    } = useDisclosure();

    const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { 
        ssr: false,
          loading: () => <div className="border border-[#464849] h-72 animate-pulse bg-gray-100" />
      }), []);

    const MAX_TAGS = 10;

    const { tags, handleAddTag, handleRemoveTag } = useTags(MAX_TAGS); // pass the maximum tags
  
    useEffect(() => {
        const getUser = async ()=>{
            try{
                if (localStorage.getItem('ojs-user')){
                    const data = await JSON.parse(
                        localStorage.getItem("ojs-user")
                    );
                    setUser(data)
                    
                }else{
                    router.push("/auth/login")
                }
            }catch(err){}
        };
        getUser();
    }, []);


    const fetchUsers = async () => {
        if (id) {
            try {
                const res = await fetch(hostUrl + `users`);
                if (res.ok) {
                    const data = await res.json();
                    const result = data.users
                    setUsers(result)
                    // fetchSubmissionFiles();
                    // console.log(result)

                } else {
                    throw new Error('Failed to fetch the submission');
                }
            } catch (err) {
                console.error('Error fetching data:', err?.message);
            }
        } else {
        }
    };

    const fetchEditors = async () => {
        if (id) {
            try {
                const res = await fetch(hostUrl + `users/editors`);
                if (res.ok) {
                    const data = await res.json();
                    const result = data.editors
                    setUserEditors(result)
                    // fetchSubmissionFiles();
                    // console.log(result)

                } else {
                    throw new Error('Failed to fetch the submission');
                }
            } catch (err) {
                console.error('Error fetching data:', err?.message);
            }
        } else {
        }
    };

    const fetchData = async () => {
        if (id) {
            try {
                const res = await fetch(hostUrl + `submissions/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    const submission = data.submission
                    setSubmission(submission)
                    setEditors(submission.editors)
                    setUsers(data.users)

                    // setTitle(submission.title);
                    // setPrefix(submission.prefix);
                    // setSubTitle(submission.subTitle);
                    // setAbstract(submission.abstract);

                   

                    // fetchSubmissionFiles();
                    // console.log(result)

                } else {
                    throw new Error('Failed to fetch the submission');
                }
            } catch (err) {
                console.error('Error fetching data:', err?.message);
            }
        } else {
        }
    };

    useEffect(()=>{
        fetchData();
    }, [id]);

    const fetchSubmissionFiles = async () => {
        if (submission) {
            try {
                const res = await fetch(hostUrl + `submissions/${id}/files`);
                if (res.ok) {
                    const data = await res.json();
                    const result = data.submissionFiles
                    setSubmissionFiles(result)
                    // console.log(result)

                } else {
                    throw new Error('Failed to fetch the submission');
                }
            } catch (err) {
                console.error('Error fetching data:', err?.message);
            }
        } else {
        }
    };

    const fetchSectionsData = async () => {
        try {
            // setIsLoading(true);
            if(selectedJournal){
              const res = await fetch(hostUrl + 'journals/sections/' + selectedJournal?.id);
              if (res.ok) {
                  const result = await res.json();
                  setSections(result.sections);
              }
            }
        } catch (err) {
            console.error('Error fetching data:', err?.message);
        } finally {
            // setIsLoading(false);
        }
    }

    const fetchIssuesData = async () => {
        try {
            // setIsLoading(true);
            if(selectedJournal){
              const res = await fetch(hostUrl + 'journals/issues/' + selectedJournal?.id);
              if (res.ok) {
                  const result = await res.json();
                  setIssues(result.issues);
              }
            }
        } catch (err) {
            console.error('Error fetching data:', err?.message);
        } finally {
            // setIsLoading(false);
        }
    }

    useEffect(()=>{
        fetchUsers();
        fetchSectionsData();
        fetchSubmissionFiles();
        fetchIssuesData();
    }, [id, submission]);


    const removeEditor = (editorId) => {
        Swal.fire({
            title: 'Are you sure you want to remove this editor?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            allowOutsideClick: () => !Swal.isLoading(), // Prevent clicking outside modal during loading
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const response = await axios.delete(hostUrl + `submissions/remove-editor/${parseInt(editorId)}/${parseInt(id)}`);

                    if (response.data.success){
                        Swal.fire(
                            'Deleted!',
                            'Detached Successfully.',
                            'success'
                        );
                        fetchData()

                    } else {
                        Swal.fire('Error!', 'There was an issue removing Submission Editor.', 'error');
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire('Error!', 'There was an issue deleting your Submission Editor.', 'error');
                    throw err; 
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {

                fetchData()

            }
        });
    };

    const deleteUpload = (uploadId) => {
        Swal.fire({
            title: 'Are you sure you want to remove this file?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            allowOutsideClick: () => !Swal.isLoading(), // Prevent clicking outside modal during loading
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const response = await axios.delete(hostUrl + `submissions/${parseInt(submission?.id)}/delete/${parseInt(uploadId)}/file`);

                    if (response.data.success){
                        Swal.fire(
                            'Deleted!',
                            response?.data?.message,
                            'success'
                        );
                        fetchSubmissionFiles()

                    } else {
                        Swal.fire('Error!', 'There was an issue removing Submission File.', 'error');
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire('Error!', 'There was an issue deleting your Submission File.', 'error');
                    throw err; 
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {

                fetchSubmissionFiles()
            }
        });
    };

    const handleOpenCurrentUpload = (upload) =>{
        setViewCurrentUpload(upload)
    }

    function openScheduleForPublication(){
        // let isPublished
        if(!submission.issue){
            isPublishingSubmission = true;
            onAssignIssueOpen();
        }

        if(!submission.issue)
            return;
        onPublishSubmissionOpen();
    }

    const acceptSubmission = () =>{
        Swal.fire({
            title: 'You\'re about to Accept this Submission.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm',
            allowOutsideClick: () => !Swal.isLoading(), // Prevent clicking outside modal during loading
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const response = await axios.post(hostUrl + `submissions/${parseInt(submission?.id)}/accept`);

                    if (response.data.success){
                        Swal.fire(
                            'Success!',
                            response?.data?.message,
                            'success'
                        );
                        fetchData()

                    } else {
                        Swal.fire('Error!', 'There was an issue accepting Submission.', 'error');
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire('Error!', 'There was an issue accepting Submission.', 'error');
                    throw err; 
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {

                fetchData()
            }
        });
    }

    const declineSubmission = () =>{
        Swal.fire({
            title: 'You\'re about to Reject this Submission.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm',
            allowOutsideClick: () => !Swal.isLoading(), // Prevent clicking outside modal during loading
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const response = await axios.post(hostUrl + `submissions/${parseInt(submission?.id)}/reject`);

                    if (response.data.success){
                        Swal.fire(
                            'Success!',
                            response?.data?.message,
                            'success'
                        );
                        fetchData()

                    } else {
                        Swal.fire('Error!', 'There was an issue declining Submission.', 'error');
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire('Error!', 'There was an issue declining Submission.', 'error');
                    throw err; 
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {

                fetchData()
            }
        });
    }

    const toggleCurrentFileStatus = async(record, index, status) => {
        if(record.is_main)
            return;
        let key = record.id
        var msg = '';
        if (key == "undefined") {
            msg = "Record key is not defined:";
            console.error(msg);
            Swal.fire('Error!', msg, 'error');
            return;
        }
            
        setIsSavingFileStatus({
            [key]: true
        });
        try {
                
            const updatedRecord = { ...record, is_main: record.is_main ? 0 : 1 };
            const updatedDataSource = submissionFiles.map(item => 
                item.id === record.id ? updatedRecord : item
            );
    
            await axios.post(hostUrl + `submissions/${submission?.id}/submission-files/toggle-main/`+record?.id);

            // setSubmissionFiles(updatedDataSource);
    
            setTimeout(() => {
                fetchSubmissionFiles();
                setIsSavingFileStatus({
                    [key]: false
                });

                msg = 'Successfully '+ (updatedRecord.is_main ? 'Activated' : 'Deactivated')  + '!!'
                Swal.fire(
                    'Success!',
                    msg,
                    'success'
                );
            }, 500);
    
        } catch (err) {
            setIsSavingFileStatus({
                [key]: false
            });
            Swal.fire('Error!', err?.message??'There was an an Error.', 'error');
        }
    
    };

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
                    <h1 className="font-bold text-2xl capitalize" dangerouslySetInnerHTML={{ __html: submission?.title}}></h1>
                </div>
            </div>

            <div className="py-2 mb-5 rounded-lg">
            <div className="relative w-full py-4 shadow-box">
              <Tabs position="relative" variant="unstyled" isLazy>
                <TabList className="whitespace-nowrap gap-3 text-sm">
                  <Tab 
                    onClick={fetchData}
                    className=" border-[#3B3939] text-[#313131] "
                    _hover={{ color: "#FFFFFF", backgroundColor:"#313131",  borderTop:"1px", borderTopColor: "#FFF" }}
                    _selected={{ color: "#313131", backgroundColor:"#FFFFFF", borderTop:"1px", borderTopColor: "#0F1B2D"}}
                  >
                    <span className="py-2 min-w-[150px]">
                      Workflow
                    </span>
                  
                  </Tab>
                  <Tab 
                    // onSelect={}
                    className=" border-[#3B3939] text-[#313131]"
                    _hover={{ color: "#FFFFFF", backgroundColor:"#313131",  borderTop:"1px", borderTopColor: "#FFF" }}
                    _selected={{ color: "#313131", backgroundColor:"#FFFFFF", borderTop:"1px", borderTopColor: "#0F1B2D"}}
                  >
                    
                    <span className="py-2  min-w-[150px]">
                    Publication
                    </span>
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel className="px-0 py-0">
                    <div>
                      <div className="bg-white min-h-[500px]">
                        <Tabs position="relative" variant="line" isLazy>

                            <TabList className="whitespace-nowrap gap-3 text-sm border-b-[0.5px] border-b-[#d5deeb]">
                                <Tab
                                    onClick={fetchSubmissionFiles}
                                    className=" border-[#3B3939] text-[#313131] "
                                    _hover={{ color: "#FFFFFF", backgroundColor:"#313131",  borderTop:"1px", borderTopColor: "#FFF" }}
                                    _selected={{ color: "#FFFFFF", backgroundColor:"#313131", borderTop:"1px", borderTopColor: "#0F1B2D"}}
                                >
                                    <span className="py-2 min-w-[150px]">
                                        Submission
                                    </span>
                                </Tab>
                                {/* <Tab 
                                    // onSelect={}
                                    className=" border-[#3B3939] text-[#313131]"
                                    _hover={{ color: "#FFFFFF", backgroundColor:"#313131",  borderTop:"1px", borderTopColor: "#FFF" }}
                                    _selected={{ color: "#FFFFFF", backgroundColor:"#313131", borderTop:"1px", borderTopColor: "#0F1B2D"}}
                                >
                                    
                                    <span className="py-2  min-w-[150px]">
                                        Reviews
                                    </span>
                                </Tab> */}
                            </TabList>
                            <TabPanels>
                                <TabPanel className="px-0 py-0">
                                    <div>
                                        <div className="bg-white min-h-[500px] p-4">
                                            <div className="flex w-full gap-3 flex-wrap lg:flex-nowrap">
                                            {/*  */}
                                                <div className=" px-3 md:p-4 py-3 rounded-lg w-full lg:w-8/12">
                                                    <div>
                                                        <div className="flex items-center justify-between gap-2">

                                                            <h3 className="font-medium text-[#212121] text-base">
                                                                Submission Files
                                                            </h3>
                                                            <button 
                                                                onClick={onUploadFileOpen}
                                                                className="w-auto whitespace-nowrap py-2 md:py-2 px-3 md:px-3 bg-[#313131] text-white transition ease-in duration-200 text-center font-semibold shadow-md rounded flex items-center justify-center gap-2 text-xs"
                                                            >
                                                                <p className="">Upload File</p>
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <div className="overflow-x-auto md:overflow-x-auto py-4 text-[#313131] scrollbar-change rounded-md">
                                                                <Table variant='unstyled' className=' table-bordered'>
                                                                    <Thead className='bg-[#F7FAFC] border-b border-[#e7ecf1]'>
                                                                    <Tr>
                                                                        <Th width={10}>#</Th>
                                                                        <Th width={'30%'}>Title</Th>
                                                                        <Th width={'30%'}>Date</Th>
                                                                        <Th width={'30%'}>Is Main</Th>
                                                                        <Th>Action</Th>
                                                                    </Tr>
                                                                    </Thead>
                                                                    <Tbody className=' w-full px-4 divide-y divide-[#e7ecf1]'>

                                                                        {submissionFiles?.length < 1 &&
                                                                            <Tr>
                                                                                <Td colSpan={8} className="px-2 py-4 text-base whitespace-nowrap text-center">
                                                                                    <span className="text-[#313131] text-base">
                                                                                        No data found
                                                                                    </span>
                                                                                </Td>
                                                                            </Tr>
                                                                        }

                                                                        {submissionFiles?.length > 0 && submissionFiles?.map((upload, index) => {

                                                                            return (
                                                                                <Tr key={index} className='px-4 hover:bg-[#F7FAFC]'>
                                                                                    <Td className="px-2 py-4 text-base whitespace-nowrap">
                                                                                        <span className="text-[#313131] text-base">
                                                                                            {index + 1}
                                                                                        </span>
                                                                                    </Td>
                                                                                    <Td className="px-2 py-4 whitespace-nowrap">
                                                                                        <div className='flex items-start justify-between text-sm'>
                                                                                            <p>
                                                                                                {upload.title}
                                                                                            </p>
                                                                                        </div>
                                                                                    </Td>
                                                                                    <Td className="px-2 py-4 whitespace-nowrap">
                                                                                        <div className='flex items-start justify-between text-sm'>
                                                                                            <p>
                                                                                                {formatMomentDate(upload.createdAt, false)}
                                                                                            </p>
                                                                                        </div>
                                                                                    </Td>

                                                                                    <Td className="px-2 py-4 whitespace-nowrap">
                                                                                        <div className='flex items-start justify-between text-sm'>
                                                                                            <button
                                                                                                className={`btn btn-sm flex items-center gap-2 ${upload.is_main ? 'btn-success' : 'btn-danger'}`}
                                                                                                disabled={isSavingFileStatus[upload.id] || upload.is_main}
                                                                                                aria-disabled={isSavingFileStatus[upload.id] || upload.is_main}
                                                                                                onClick={
                                                                                                    ()=>toggleCurrentFileStatus(upload, index, upload.is_main)
                                                                                                }
                                                                                                >
                                                                                                    {isSavingFileStatus[upload.id] ? (
                                                                                                        <>
                                                                                                            <LoaderIcon
                                                                                                                extraClass="text-white h-5 w-5"
                                                                                                                className="animate-spin mr-1"
                                                                                                            />
                                                                                                        </>
                                                                                                    ) : (
                                                                                                        upload.is_main ? 'Main' : 'Not Inactive'
                                                                                                    )}
                                                                                                    
                                                                                            </button>
                                                                                        </div>
                                                                                    </Td>
                                                                                    
                                                                                    <Td className="px-2 py-4 text-sm whitespace-nowrap">
                                                                                        <div className="text-[#313131] text-xs flex items-center justify-center gap-2 flex-row">
                                                                                            {upload.file_type == 'pdf' ? 
                                                                                                <Tooltip hasArrow label='view' placement='top'>
                                                                                                    <button onClick={()=>handleOpenCurrentUpload(upload)} className='btn px-2 py-1 btn-primary btn border border-[#e1e5ec] rounded !text-[#fff] flex items-center'>
                                                                                                        <Eye size={16}/>
                                                                                                    </button>
                                                                                                </Tooltip>
                                                                                            : <>
                                                                                                <Tooltip hasArrow label='download' placement='top'>
                                                                                                    <Link href={upload?.file_url} target="_blank" download className='btn px-2 py-1 btn-info btn border border-[#e1e5ec] rounded !text-[#fff] flex items-center'>
                                                                                                        <DocumentDownload size={16}/>
                                                                                                    </Link>
                                                                                                </Tooltip>

                                                                                            </>}

                                                                                            <Tooltip hasArrow label='delete' placement='top'>
                                                                                                <button type="button" onClick={()=>deleteUpload(upload?.id)} className='btn px-2 py-1 btn-red btn border border-[#e1e5ec] rounded !text-[#fff] flex items-center'>
                                                                                                    <Trash size={16}/>
                                                                                                </button>
                                                                                            </Tooltip>
                                                                                        </div>
                                                                                    </Td>

                                                                                </Tr>
                                                                            )
                                                                        })}
                                                                    </Tbody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="px-3 md:p-4 rounded-lg sidebar w-full lg:w-4/12 space-y-4">
                                                    <div className="space-y-3">
                                                        {showReviews ? 
                                                            <>
                                                                <button 
                                                                    className="w-full whitespace-nowrap py-2 md:py-3 px-3 md:px-3 bg-[#008080] text-white transition ease-in duration-200 text-center font-semibold shadow-md rounded flex items-center justify-center gap-2 text-xs"
                                                                >
                                                                    <p className="">Send To Review</p>
                                                                </button>
                                                                <button 
                                                                    className="w-full whitespace-nowrap py-2 md:py-3 px-3 md:px-3 bg-[#313131] text-white transition ease-in duration-200 text-center font-semibold shadow-md rounded flex items-center justify-center gap-2 text-xs"
                                                                >
                                                                    <p className="">Accept and Skip Review</p>
                                                                </button>
                                                            </>
                                                            : <></>
                                                        }

                                                        {submission?.issue?.published_status || submission?.issue?.published_status ? 
                                                            <div className="text-sm">
                                                                <p><strong>Submission Published.</strong></p>
                                                            </div>
                                                        : ''}

                                                        {submission?.status !== 0 && submission?.issue?.published_status == 0 ? 
                                                            <div className="text-sm">
                                                                <p><strong>Submission {submission?.status == 1 ? 'Accepted' : ''}{submission?.status == 2 ? 'Rejected' : ''}.</strong></p>
                                                            </div>
                                                        : ''}

                                                        {submission?.status !== 0 ? 
                                                            <div className="text-sm">
                                                                <span className="underline cursor-pointer" onClick={()=>{setChangeAcceptanceStatus(!changeAcceptanceStatus)}}>Change Decision</span>
                                                            </div>
                                                        : ''}


                                                        {submission?.status == 0 || changeAcceptanceStatus ? 
                                                            <>
                                                                <button onClick={()=>acceptSubmission()}
                                                                    className="w-full whitespace-nowrap py-2 md:py-3 px-3 md:px-3 bg-[#008000] border border-transparent text-white transition ease-in duration-200 text-center font-semibold shadow-md rounded flex items-center justify-center gap-2 text-xs"
                                                                >
                                                                    <p className="">Accept Submission</p>
                                                                </button>

                                                                <button onClick={()=>declineSubmission()}
                                                                    className="w-full whitespace-nowrap py-2 md:py-3 px-3 md:px-3 bg-[#c51b26] border border-transparent text-white transition ease-in duration-200 text-center font-semibold shadow-md rounded flex items-center justify-center gap-2 text-xs"
                                                                >
                                                                    <p className="">Decline Submission</p>
                                                                </button>
                                                            </>
                                                        : ''}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center justify-between gap-2 bg-[#eee] p-2">
                                                            <h3 className="text-[#212121] text-base font-semibold">
                                                                Participants
                                                            </h3>
                                                            <button  
                                                                onClick={onAttachEditorOpen}
                                                                className="w-auto whitespace-nowrap py-2 md:py-2 px-3 md:px-3 bg-[#313131] text-white transition ease-in duration-200 text-center font-semibold shadow-md rounded flex items-center justify-center gap-2 text-xs"
                                                            >
                                                                <p className="">Assign</p>
                                                            </button>
                                                        </div>
                                                        {editors.length < 1 ? 
                                                            <div className="p-3 shadow">
                                                                <p className="text-sm">Assign an editor to enable the editorial decisions for this stage.</p>
                                                            </div>
                                                        : <></>}

                                                        {editors.length > 0 ? 
                                                            <div className="pb-4">
                                                                <div className="flex items-center justify-between gap-2 mb-2 bg-[#eee] p-2">
                                                                    <h3 className="text-[#212121] text-sm font-semibold">
                                                                        Editor{editors.length > 1 ?'s':''}
                                                                    </h3>
                                                                </div>                                                                        
                                                                <div className="space-y-3" >
                                                                    {editors?.map((item, index )=>{
                                                                        return(
                                                                            <div className="flex items-center justify-between" key={index}>
                                                                                <p className="text-sm">{getFullName(item.editor)}.</p>
                                                                                <span onClick={()=>removeEditor(item.editor.id)} className="text-[#c51b26] cursor-pointer">
                                                                                    <Trash size={15} />
                                                                                </span>
                                                                            </div>

                                                                        )
                                                                    })}
                                                                </div>
                                                                
                                                            </div>
                                                        : <></>}
                                                    </div>

                                                    <div className="py-4">
                                                        
                                                        <div className="flex items-center justify-between gap-2 mb-2 bg-[#eee] p-2">
                                                            <h3 className="text-[#212121] text-sm font-semibold">
                                                                Author
                                                            </h3>
                                                        </div>
                                                        <div className="">
                                                            <p className="text-sm">{getFullName(submission?.user)}.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </TabPanel>
                                {/* <TabPanel className="px-0 py-0">
                                    <div>
                                        <div className="bg-white min-h-[500px] p-4">
                                            2
                                        </div>
                                    </div>
                                </TabPanel> */}
                            </TabPanels>

                        </Tabs>

                      </div>
                    </div>

                  </TabPanel>
                  <TabPanel className="px-0 py-0">
                    <div>
                      <div className="bg-white min-h-[500px]">
                            <>
                                <div className="flex items-center justify-between gap-2 border-b border-b-[#eee] px-3 py-3">                                
                                    <h3 className="text-[#212121] text-base font-semibold">
                                        Status: <span>{submission?.publication_status === 1 ? <span className="text-green-400">Scheduled</span> : <span className="text-red-400">Unscheduled</span>}</span>
                                    </h3>

                                    { (submission?.status === 0 || submission?.status === 1) && (submission?.publication_status == 0) ?
                                        <button  
                                            onClick={openScheduleForPublication}
                                            className="w-auto whitespace-nowrap py-2 md:py-2 px-3 md:px-3 bg-[#313131] text-white transition ease-in duration-200 text-center font-semibold shadow-md rounded flex items-center justify-center gap-2 text-xs"
                                        >
                                            <p className="">Schedule For Publication</p>
                                        </button>

                                        : 
                                        <button  
                                            onClick={onUnPublishSubmissionOpen}
                                            className="w-auto whitespace-nowrap py-2 md:py-2 px-3 md:px-3 btn-red text-white transition ease-in duration-200 text-center font-semibold shadow-md rounded flex items-center justify-center gap-2 text-xs"
                                        >
                                            <p className="">Unpublish</p>
                                        </button>

                                    }
                                
                                            
                                </div>
                            </> 

                            { submission?.issue && submission?.issue?.published_status ? 
                                <>
                                    <div className="flex items-center justify-between gap-2  bg-red-600 text-white px-3 py-3 text-center w-full">
                                        <h3 className="text-base font-semibold w-full">
                                            This version has been published and can not be edited.
                                        </h3>
                                    </div>
                                </>
                                : ''
                            }

                        <Tabs position="relative" variant="unstyled" isLazy className="flex">

                        <TabList className="whitespace-nowrap gap-3 text-sm border-r-[0.5px] border-r-[#d5deeb] flex flex-col text-left ">
                            <Tab
                                className=" border-[#3B3939] text-[#313131] text-left"
                                _hover={{ color: "#FFFFFF", backgroundColor:"#313131",  borderTop:"1px", borderTopColor: "#FFF" }}
                                _selected={{ color: "#FFFFFF", backgroundColor:"#313131", border:"0px", borderRight:"1px", borderRightColor: "#313131"}}
                            >
                                <span className="py-2 min-w-[150px]">
                                    Title and Abstract
                                </span>
                            </Tab>
                            <Tab 
                                // onSelect={}
                                className=" border-[#3B3939] text-[#313131] text-left"
                                _hover={{ color: "#FFFFFF", backgroundColor:"#313131",  borderTop:"1px", borderTopColor: "#FFF" }}
                                _selected={{ color: "#FFFFFF", backgroundColor:"#313131", borderTop:"1px", borderTopColor: "#0F1B2D"}}
                            >
                                
                                <span className="py-2  min-w-[150px]">
                                    Contributors
                                </span>
                            </Tab>
                            <Tab 
                                // onSelect={}
                                className=" border-[#3B3939] text-[#313131]  text-left"
                                _hover={{ color: "#FFFFFF", backgroundColor:"#313131",  borderTop:"1px", borderTopColor: "#FFF" }}
                                _selected={{ color: "#FFFFFF", backgroundColor:"#313131", borderTop:"1px", borderTopColor: "#0F1B2D"}}
                            >
                                
                                <span className="py-2  min-w-[150px]">
                                    Metadata
                                </span>
                            </Tab>
                            <Tab 
                                // onSelect={}
                                className=" border-[#3B3939] text-[#313131] text-left"
                                _hover={{ color: "#FFFFFF", backgroundColor:"#313131",  borderTop:"1px", borderTopColor: "#FFF" }}
                                _selected={{ color: "#FFFFFF", backgroundColor:"#313131", borderTop:"1px", borderTopColor: "#0F1B2D"}}
                            >
                                
                                <span className="py-2  min-w-[150px]">
                                    Galleys
                                </span>
                            </Tab>
                            <Tab 
                                // onSelect={}
                                className=" border-[#3B3939] text-[#313131] text-left"
                                _hover={{ color: "#FFFFFF", backgroundColor:"#313131",  borderTop:"1px", borderTopColor: "#FFF" }}
                                _selected={{ color: "#FFFFFF", backgroundColor:"#313131", borderTop:"1px", borderTopColor: "#0F1B2D"}}
                            >
                                
                                <span className="py-2  min-w-[150px]">
                                    Issue
                                </span>
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel className="px-0 py-0">
                                <div>
                                    <div className="bg-white min-h-[500px] p-4">
                                        <div>
                                            <div className="px-3 md:px-6 py-3 md:py-6">
                                                <UpdateSubmissionTitleForm submission={submission} fetchData={fetchData}/>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className="px-0 py-0">
                                <div>
                                    <div className="bg-white min-h-[500px] p-4">
                                        <div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className="px-0 py-0">
                                <div>
                                    <div className="bg-white min-h-[500px] p-4">
                                        <div>
                                            <div className=" px-3 md:px-6 py-3 md:py-6">
                                                <div className="">
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
                                                <Box mt={4}>
                                                    <div className="flex items-center justify-end w-full gap-3 flex-wrap">
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
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className="px-0 py-0">
                                <div>
                                    <div className="bg-white min-h-[500px] p-4">
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className="px-0 py-0">
                                <div>
                                    <div className="bg-white min-h-[500px] p-4">
                                        <div>
                                            <div className=" px-3 md:px-6 py-3 md:py-6">
                                                <div className="flex items-center justify-start gap-2 mb-6">
                                                    <h3 className="text-[#212121] text-base">
                                                        {!submission?.issue ? "This has not been scheduled for publication in an issue. " : <span>Assign to Issue. Published in <span className="underline text-blue-400">Vol. {submission?.issue?.volume} No. {submission?.issue?.number} ({submission?.issue?.year}): {submission?.issue?.title}</span></span>}
                                                    </h3>

                                                    {!submission?.issue || submission?.issue?.published_status == 0  ? 
                                                        <button  
                                                            onClick={onAssignIssueOpen}
                                                            className="w-auto whitespace-nowrap py-2 md:py-2 px-3 md:px-3 bg-[#313131] text-white transition ease-in duration-200 text-center font-semibold shadow-md rounded flex items-center justify-center gap-2 text-xs"
                                                        >
                                                            <p className="">Assign Issue</p>
                                                        </button>
                                                    : <></>}

                                                </div>

                                                <UpdateSubmissionIssuesForm submission={submission} fetchData={fetchData} sections={sections}/>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </TabPanels>

                        </Tabs>
                      </div>
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </div>

            <UploadFileSubmissionModal
                user={user}
                isOpen={uploadFileIsOpen}
                onClose={onUploadFileClose}
                currentUpload={currentUpload}
                currentSubmission={submission}
                uploadList={uploads}
                setCurrentUpload={setCurrentUpload}
                fetchUploads={fetchSubmissionFiles}
            />

            <AssignEditorSubmissionModal
                isOpen={attachEditorIsOpen}
                onClose={onAttachEditorClose}
                submission={submission}
                usersList={users}
                fetchData={fetchData}
            />

            <AssignIssueSubmissionModal
                isOpen={assignIssueIsOpen}
                onClose={onAssignIssueClose}
                submission={submission}
                issuesList={issues}
                fetchData={fetchData}
                isPublishingSubmission={isPublishingSubmission}
                onPublishSubmissionOpen={onPublishSubmissionOpen}
            />

            <PublishSubmissionModal
                isOpen={publishSubmissionIsOpen}
                onClose={onPublishSubmissionClose}
                submission={submission}
                fetchData={fetchData}
            />

            <UnPublishSubmissionModal
                isOpen={unPublishSubmissionIsOpen}
                onClose={onUnPublishSubmissionClose}
                submission={submission}
                fetchData={fetchData}
            />
        </>
    )
}

export default SingleSubmission
