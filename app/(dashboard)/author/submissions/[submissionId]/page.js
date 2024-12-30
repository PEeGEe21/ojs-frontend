"use client"
import { Box, Progress, Tab, TabIndicator, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast, Tooltip } from "@chakra-ui/react";
import UploadFileSubmissionModal from "../../../../components/Modals/UploadFileSubmissionModal"
import AssignEditorSubmissionModal from "../../../../components/Modals/AssignEditorSubmissionModal"
import AssignIssueSubmissionModal from "../../../../components/Modals/AssignIssueSubmissionModal"
import AddSubmissionContributorModal from "../../../../components/Modals/AddSubmissionContributorModal"
import UpdateSubmissionContributorModal from "../../../../components/Modals/UpdateSubmissionContributorModal"
import "react-quill-new/dist/quill.snow.css";
import { ArrowLeft, Check, DocumentDownload, Eye, TagCross, Trash } from 'iconsax-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { formatMomentDate, hostUrl } from "../../../../lib/utilFunctions";
import { getContributorRole, getFullName } from "../../../../utils/common";
import Swal from 'sweetalert2';
import axios from "axios";
import { modules, styles } from "../../../../lib/constants";
import dynamic from "next/dynamic";
import { TagField } from "../../../../components/TagField";
import useTags from "../../../../hooks/useTags";
import { JournalContext } from "../../../../utils/journalContext";
import UpdateSubmissionIssuesForm from "../../../../components/Forms/UpdateSubmissionIssuesForm"
import UpdateSubmissionTitleForm from "../../../../components/Forms/UpdateSubmissionTitleForm"
import UpdateKeywordsForm from "../../../../components/Forms/UpdateKeywordsForm"
import ContributorsTableList from "../../../../components/Tables/ContributorsTableList"
import PDFViewer from "../../../../components/PDFViewer"
import Link from "next/link";
import { Checkmark, Close } from "@carbon/icons-react";

const SingleSubmission = () => {
    const { selectedJournal } = useContext(JournalContext);
    const router = useRouter();
    const [user, setUser ] = useState(null);
    const [submission, setSubmission ] = useState(null);
    const [submissionFiles, setSubmissionFiles ] = useState([]);
    const [contributors, setSubmissionContributors ] = useState([]);
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
    const [currentContributor, setCurrentContributor] = useState(null);
    const [editors, setEditors] = useState([]);

    const [showReviews, setShowReviews] = useState(false)
    const params = useParams();
    const { submissionId } = params;    
    const id = submissionId;

    const {
        isOpen: uploadFileIsOpen,
        onOpen: onUploadFileOpen,
        onClose: onUploadFileClose,
    } = useDisclosure();

    const {
        isOpen: addContributorIsOpen,
        onOpen: onAddContributorOpen,
        onClose: onAddContributorClose,
    } = useDisclosure();

    const {
        isOpen: updateContributorIsOpen,
        onOpen: onUpdateContributorOpen,
        onClose: onUpdateContributorClose,
    } = useDisclosure();

    const {
        isOpen: attachEditorIsOpen,
        onOpen: onAttachEditorOpen,
        onClose: onAttachEditorClose,
    } = useDisclosure();

    const {
        isOpen: assignnIssueIsOpen,
        onOpen: onAssignIssueOpen,
        onClose: onAssignIssueClose,
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

    const fetchData = async () => {
        if (id) {
            try {
                const res = await fetch(hostUrl + `submissions/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    const submission = data.submission
                    setSubmission(submission)
                    setEditors(submission.editors)
                    setSubmissionContributors(submission.contributors)
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
        // if(upload.file_type === )
            setViewCurrentUpload(upload)
    }


    return (
        <>
            <div className="flex flex-row items-center justify-start gap-4 mb-8">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 w-auto whitespace-nowrap py-2 px-3 bg-[#313131] text-white rounded-md"
                >
                    <ArrowLeft />
                </button>

                <div className="w-full">
                    <h1 className=" whitespace-nowrap font-bold text-2xl capitalize">{submission?.title}</h1>
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
                            </TabList>
                            <TabPanels>
                                <TabPanel className="px-0 py-0">
                                    <div>
                                        

                                        {currentViewUpload ? 
                                            <div>
                                                <PDFViewer fileUrl={currentViewUpload?.file_url??'/doc/0.18676590481212108.pdf'} />
                                                <div className="flex items-center justify-end mt-2">
                                                    <button onClick={()=>{setViewCurrentUpload(null)}} className="btn btn-red rounded ">
                                                        Close
                                                    </button>
                                                </div>

                                            </div>
                                            :<>
                                            
                                                <div className="bg-white min-h-[500px] p-4">
                                                    <div className="flex w-full gap-3">
                                                    {/*  */}
                                                        <div className=" px-3 md:p-4 py-3 rounded-lg w-full">
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
                                                                                <Th width={50}>Title</Th>
                                                                                <Th width={20}>Date</Th>
                                                                                <Th width={10}>Type</Th>
                                                                                <Th width={10}>Action</Th>
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
                                                                                                        {formatMomentDate(upload?.createdAt, false)}
                                                                                                    </p>
                                                                                                </div>
                                                                                            </Td>
                                                                                            <Td className="px-2 py-4 whitespace-nowrap">
                                                                                                <div className='flex items-start justify-between text-sm'>
                                                                                                    <p>
                                                                                                        {(upload?.file_type).toUpperCase()}
                                                                                                    </p>
                                                                                                </div>
                                                                                            </Td>
                                                                                            
                                                                                            <Td className="px-2 py-4 text-sm whitespace-nowrap">
                                                                                                <div className="text-[#313131] text-xs flex items-center  gap-2 flex-row">
                                                                                                    {/* && status === 'In Progress'  */}
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
                                                        
                                                    </div>
                                                </div>

                                            </>}

                                    </div>
                                </TabPanel>
                                <TabPanel className="px-0 py-0">
                                    <div>
                                        <div className="bg-white min-h-[500px] p-4">
2
                                        </div>
                                    </div>
                                </TabPanel>
                            </TabPanels>

                        </Tabs>

                      </div>
                    </div>

                  </TabPanel>
                  <TabPanel className="px-0 py-0">
                    <div>
                      <div className="bg-white min-h-[500px]">

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
                                        <div className=" px-3 md:p-4 py-3 rounded-lg w-full">
                                            <ContributorsTableList 
                                                contributors={contributors} 
                                                fetchData={fetchData} 
                                                onAddContributorOpen={onAddContributorOpen} 
                                                onUpdateContributorOpen={onUpdateContributorOpen} 
                                                setCurrentContributor={setCurrentContributor}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className="px-0 py-0">
                                <div>
                                    <div className="bg-white min-h-[500px] p-4">
                                        <div>
                                            <UpdateKeywordsForm submission={submission} fetchData={fetchData}/>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className="px-0 py-0">
                                <div>
                                    <div className="bg-white min-h-[500px] p-4">
                                    </div>
                                </div>￼
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
                uploadList={setUploads}
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
                isOpen={assignnIssueIsOpen}
                onClose={onAssignIssueClose}
                submission={submission}
                issuesList={issues}
                fetchData={fetchData}
            />

            <AddSubmissionContributorModal
                isOpen={addContributorIsOpen}
                onClose={onAddContributorClose}
                submission={submission}
                fetchData={fetchData}
            />

            <UpdateSubmissionContributorModal
                isOpen={updateContributorIsOpen}
                onClose={onUpdateContributorClose}
                submission={submission}
                contributor={currentContributor}
                fetchData={fetchData}
            />


        </>
    )
}

export default SingleSubmission
