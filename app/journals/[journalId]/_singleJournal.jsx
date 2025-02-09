'use client'
import React, { useState, useEffect } from 'react'
import { blurDataUrl } from '../../lib/constants'
import Image from 'next/image'
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    useToast
  } from '@chakra-ui/react'
import { ChevronRight, DocumentExport, Recycle } from '@carbon/icons-react'
import Link from 'next/link'
import { dateFormat, formatMomentDate, hostUrl, shortenTitle, slugify } from '../../lib/utilFunctions';
import { LoaderIcon } from '../../components/IconComponent';
import ArticleSummaryDrawer  from '../../components/Drawer/ArticleSummaryDrawer';
import IssuesCarousel  from '../../components/IssuesCarousel';
import axios from 'axios';
import { getFullName } from '../../utils/common';

const SingleJournal = () => {
    const [journal, setJournal] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingSubmissions, setIsFetchingSubmissions] = useState(false);
    const [showSubmissions, setShowSubmissions] = useState(false);
    const [latestIssue, setLatestIssue] = useState(null);
    const [currentArticle, setCurrentArticle] = useState(null);
    const [pageTitle, setPageTitle] = useState(null);
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
    const [summary, setSummary] = useState(null);
    const [issues, setIssues] = useState([]);
    const [isFetchingIssues, setIsFetchingIssues] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    const router = useRouter();
    const { 
        isOpen: isOpenSummaryDrawer, 
        onOpen: onOpenSummaryDrawer, 
        onClose: onCloseSummaryDrawer 
    } = useDisclosure();
    const params = useParams();
    const { journalId } = params;    
    const id = journalId;


    useEffect(()=>{
        if(id){
            setPageTitle('Update');
        }
    }, [id]);


    useEffect(()=>{
        const fetchData = async () => {
            if (id) {
                try {
                    const res = await fetch(hostUrl + `journals/${id}`);
                    if (res.ok) {
                        const data = await res.json();
                        const result = data.journal
                        // console.log(result)

                        setJournal(result);
                        fetchIssues();
                        fetchLatestIssue();
                        // setSubmissions(result.submissions);
                        setIsLoading(false);
                    } else {
                        throw new Error('Failed to fetch the journal');
                    }
                } catch (err) {
                    console.error('Error fetching data:', err?.message);
                }
            }
        };

        fetchData();
    }, [id]);

    const openSummary = (item) =>{
        setCurrentArticle(item)
        // if(currentArticle)
        onOpen();
    }

    const fetchIssueSubmissions = () =>{
        setIsFetchingSubmissions(true)
        fetchIssueSubmissionsMain()
        // setShowSubmissions(!showSubmissions)
        // setCurrentArticle(issue)
        // if(currentArticle)
    }

    const fetchIssues = async () => {
        if (id) {
            try {
                const res = await fetch(hostUrl + `journals/issues/published/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    const result = data.issues
                    setIssues(result);
                    setIsFetchingIssues(false)
                } else {
                    throw new Error('Failed to fetch issues');
                }
            } catch (err) {
                console.error('Error fetching data:', err?.message);
            }
        }
    };

    const fetchLatestIssue = async () => {
        if (id) {
            try {
                const res = await fetch(hostUrl + `journals/${id}/latest-issue`);
                if (res.ok) {
                    const data = await res.json();
                    const result = data.latest_issue

                    setLatestIssue(result);

                } else {
                    throw new Error('Failed to fetch the issue');
                }
            } catch (err) {
                console.error('Error fetching data:', err?.message);
            }
        }
    };

    const fetchIssueSubmissionsMain = async () => {
        if (latestIssue?.id) {
            try {
                const res = await fetch(hostUrl + `issues/${latestIssue?.id}/submissions`);
                if (res.ok) {
                    const data = await res.json();
                    const result = data.submissions

                    setSubmissions(result);
                    setShowSubmissions(!showSubmissions);
                    setIsFetchingSubmissions(false)

                } else {
                    throw new Error('Failed to fetch the submissions');
                }
            } catch (err) {
                console.error('Error fetching data:', err?.message);
            }
        }
    };

    const getArticleSummary = async (article) => {
        setCurrentArticle(article)
        setIsGeneratingSummary(true);
        if (article?.file?.id) {
            try {
                // console.log(article?.file?.id, 'smldsm')
                // return
                const response = await axios.post(hostUrl + `submissions/${article?.file?.id}/summarize`);
                if (response.data.success) {
                    const data = response.data.summary;
                    setSummary(data);
                    onOpenSummaryDrawer();
                    toast({
                        title: "Summary generated successfully",
                        status: "success",
                        duration: 2000,
                        position: "top-right",
                    });
                } else {
                    toast({
                        title: response?.data?.error??"Failed to generate summary.",
                        description: "Failed",
                        status: "error",
                        duration: 2000,
                        position: "top-right",
                    });
                }
                setIsGeneratingSummary(false);
            } catch (err) {
                console.error('Error fetching data:', err?.message);
                toast({
                    title: "Failed to generate summary.",
                    description: "Failed",
                    status: "error",
                    duration: 2000,
                    position: "top-right",
                });
            } finally {
                setIsGeneratingSummary(false);
            }
        }
    };

    return (
        <>
            <div className='min-h-32 h-32 bg-stone-400 relative text-white' style={{backgroundImage: 'url(/images/albert-canite-RG2YD21o81E-unsplash.jpg)', backgroundPosition: 'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'scroll'}}>
                <div className='px-4 max-w-6xl mx-auto h-full items-center justify-center flex text-2xl font-semibold z-[999]'>
                    <span className='z-[10]'>{journal?.name}</span>
                </div>
                <div className='absolute w-full h-full top-0 left-0 bg-black opacity-70 pointer-events-none'></div>
            </div>

            {/* breadcrumb */}
            <div className="container max-w-6xl mx-auto px-4 py-4">
                <Breadcrumb spacing='8px' separator={<ChevronRight color='#000' />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink href='/journals'>Journals</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='#'>{journal?.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>


            <section className="sectionspace pb-28">
                    <div className="container max-w-[750px] md:max-w-[970px] lg:max-w-[1170px] mx-auto px-4 pb-12 border-x border-gray-100 mt-8 shadow">
                        <div className='px-4 '>

                            <div className="flex gap-4 flex-wrap">
                                <div className='w-full lg:w-4/12 flex-1'>
                                    <div className="rounded relative h-[200px] md:h-[300px] overflow-hidden">
                                        <Image 
                                            src={`${journal?.file_url??'/images/albert-canite-RG2YD21o81E-unsplash.jpg'}`} 
                                            alt={`${journal?.slug ? slugify(journal?.slug) : journal?.name}`} 
                                            className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105" 
                                            height={300}
                                            width={800}
                                            quality={100}
                                            sizes="(max-width: 768px) 100vw, 800px"
                                            placeholder="blur"
                                            blurDataURL={blurDataUrl}
                                        />
                                    </div>
                                </div>
                                <div className='w-full lg:w-8/12'>
                                    <div>
                                        <div>
                                            <h3 className='font-bold text-lg mb-2'>About the Journal</h3>
                                            <div className='text-justify'>
                                                <div className="" dangerouslySetInnerHTML={{ __html: journal?.note}}></div>
                                            </div>
                                        </div>


                                        <div className='flex items-end justify-end mt-2 flex-col text-sm'>
                                            {/* <p>Editor: <span className='font-semibold'> Udeh Praise</span></p> */}
                                            {/* <p>Affiliation: <span className='font-semibold'> Udeh Praise</span></p> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                             {latestIssue ?
                                <div className='mt-8 py-5 space-y-8'>
                           
                            
                                    <div>
                                        <div>
                                            <h3 className='text-lg text-left font-semibold mb-3'>Latest Issue</h3>
                                        </div>
                                        <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3'>
                                            
                                            <div>
                                                
                                                <button 
                                                    type='button' 
                                                    onClick={fetchIssueSubmissions}
                                                    className="group rounded-md overflow-hidden hover:shadow-lg transition duration-300 ease border border-gray-200 w-full flex flex-col md:flex-row justify-start">
                                                    <div className="rounded-t relative h-[200px] w-full md:w-[150px] overflow-hidden ">
                                                            <Image 
                                                                src={`${latestIssue?.cover_image_url??'/images/albert-canite-RG2YD21o81E-unsplash.jpg'}`} 
                                                                alt={`${latestIssue?.title ? slugify(latestIssue?.title) : 'alt'}`} 
                                                                className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105" 
                                                                height={300}
                                                                width={800}
                                                                quality={100}
                                                                sizes="(max-width: 768px) 100vw, 800px"
                                                                placeholder="blur"
                                                                blurDataURL={blurDataUrl}
                                                            />
                                                    </div>

                                                    <div className="text-left flex-1 h-full">
                                                        <div className="py-4 flex flex-col gap-2 px-5 text-left flex-1 grow justify-between h-full w-full">
                                                            <div className='flex flex-col'>
                                                                <span className=" text-gray-900 text-base font-semibold">
                                                                    {shortenTitle(latestIssue?.title, 36)}
                                                                </span>
                                                                <span className="text-gray-700 leading-none text-sm mb-2">
                                                                    {shortenTitle(latestIssue?.descriptionPlain, 50)}
                                                                </span>
                                                            </div>

                                                            <span className="text-gray-700 leading-none text-xs mb-2 ">
                                                                {dateFormat(latestIssue?.published_at)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </button> 
                                            </div>


                                        </div>
                                    </div>
                                    

                                    {showSubmissions ? 
                                        <div className='mt-5'>
                                            <h3 className='text-base text-left font-semibold mb-3 underline'>Articles</h3>
                                            <div className='space-y-3'>
                                                {!isFetchingSubmissions ?                         
                                                    (<div>
                                                        {submissions?.length > 0 ? (
                                                            submissions.map((item, index)=>(
                                                                <div className='flex flex-col gap-3 mb-5' key={index}>
                                                                    <Link href={'/journals/' + journal?.id+ '/articles/' + item.id} className='font-bold text-[#008080]'>
                                                                        {item.title}
                                                                    </Link>
                                                                    <span>
                                                                        {getFullName(item.user)}
                                                                    </span>
                                                                    {/* <div className='flex items-center justify-start gap-2'>
                                                                        <button className='flex items-center justify-center gap-1 rounded-md border border-[#008080] p-2 px-3 text-xs min-w-[90px] text-[#008080]'>
                                                                            <DocumentExport/> PDF
                                                                        </button>
                                                                        <button onClick={()=>openSummary(item)} className='flex items-center justify-center gap-1 rounded-md border border-[#008000] bg-[#008000] p-2 px-3 text-xs min-w-[90px] text-white'>
                                                                            <Recycle/> Summary
                                                                        </button>
                                                                    </div> */}

                                                                    {item?.file ? 
                                                                        <div className='flex items-center justify-start gap-2'>
                                                                            <Link 
                                                                                href={`${item?.file?.file_url}`} 
                                                                                download 
                                                                                target='_blank' 
                                                                                className='flex items-center justify-center gap-1 rounded-md border border-[#008080] p-2 px-3 text-xs min-w-[90px] text-[#008080]'>
                                                                                <DocumentExport/> PDF
                                                                            </Link>
                                                                            <button 
                                                                                disabled={isGeneratingSummary} 
                                                                                onClick={()=>getArticleSummary(item)} 
                                                                                className='flex items-center justify-center gap-1 rounded-md border border-[#008000] bg-[#008000] p-2 px-3 text-xs min-w-[90px] text-white'>
                                                                                {isGeneratingSummary ? <>
                                                                                    <span className="animate-spin">⏳</span> Summarizing... </>: <><Recycle/> Summarize</>}
                                                                            </button>
                                                                        </div>
                                                                    : ''}
                                                                </div>
                                                            )))
                                                        : 'No Submissions Found'}
                                                    </div>)
                                                    :
                                                    (<div className="h-full flex items-center justify-center">
                                                        <LoaderIcon extraClass="text-black h-8 w-6"/>
                                                    </div>)
                                                }
                                            </div>
                                        </div>

                                    : ''}
                                </div>
                            : ''}
                        </div>
                        
                    </div>

                    <div className="container max-w-[750px] md:max-w-[970px] lg:max-w-[1170px] mx-auto px-4 mt-8">
                        {!isFetchingIssues ?  <>         
                                { issues.length > 0 ?        
                                    <IssuesCarousel data={issues}/> : ''}</>
                            :
                                (<div className="h-full flex items-center justify-center">
                                    <LoaderIcon extraClass="text-black h-8 w-6"/>
                                </div>)
                        }
                    </div>
            </section>

            <ArticleSummaryDrawer isOpen={isOpenSummaryDrawer} onClose={onCloseSummaryDrawer} currentArticle={currentArticle} summary={summary}/>

        </>
    )
}

export default SingleJournal
