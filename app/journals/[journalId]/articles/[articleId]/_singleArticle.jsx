'use client'
import React, { useState, useEffect } from 'react'
import { blurDataUrl } from '../../../../lib/constants'
import Image from 'next/image'
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    List,
    MenuItem,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { ChevronRight, DocumentExport, Recycle } from '@carbon/icons-react'
import Link from 'next/link'
import { formatMomentDate, hostUrl, shortenTitle } from '../../../../lib/utilFunctions';
import { LoaderIcon } from '../../../../components/IconComponent';
import ArticleRecoSearchForm from '../../../../components/Forms/ArticleRecoSearchForm';
import ArticleSearchDrawer from '../../../../components/Drawer/ArticleSearchDrawer';
import { Menu } from 'iconsax-react';
import { getFullName } from '../../../../utils/common';
import ArticleSummaryDrawer from '../../../../components/Drawer/ArticleSummaryDrawer';
import axios from 'axios';

const SingleArticle = () => {
    const [journal, setJournal] = useState(null);
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [pageTitle, setPageTitle] = useState(null);
    const [getReco, setGetRecoSuccess] = useState(false);
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
    const [summary, setSummary] = useState(null);
    const [recommendation, setRecommendation] = useState([]);
    const router = useRouter();
    const toast = useToast();

    // const params = useParams();
    // const { slug } = params;    
    // const id = slug;

    const { journalId, articleId } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { 
        isOpen: isOpenSummaryDrawer, 
        onOpen: onOpenSummaryDrawer, 
        onClose: onCloseSummaryDrawer 
    } = useDisclosure();


    const journalIdNum = parseInt(journalId);
    const articleIdNum = parseInt(articleId);
    
    // useEffect(()=>{
    //     if(journalIdNum){
    //         setPageTitle('Update');
    //     }
    // }, [journalIdNum]);


    useEffect(()=>{
        const fetchData = async () => {
            if (journalIdNum) {
                try {
                    const res = await fetch(hostUrl + `journals/${journalIdNum}`);
                    if (res.ok) {
                        const data = await res.json();
                        const result = data.journal
                        // console.log(result)

                        setJournal(result);
                        // setSubmissions(result.submissions);
                        // setIsLoading(false);
                    } else {
                        throw new Error('Failed to fetch the journal');
                    }
                } catch (err) {
                    console.error('Error fetching data:', err?.message);
                }
            }
        };

        fetchData();
    }, [journalIdNum]);

    useEffect(()=>{
        const fetchArticle = async () => {
            if (articleIdNum) {
                try {
                    const res = await fetch(hostUrl + `submissions/${articleIdNum}`);
                    if (res.ok) {
                        const data = await res.json();
                        const result = data.submission

                        setArticle(result);
                        setIsLoading(false);
                    } else {
                        throw new Error('Failed to fetch the article');
                    }
                } catch (err) {
                    console.error('Error fetching data:', err?.message);
                }
            }
        };
        fetchArticle()
    }, [articleIdNum]);


    const getArticleSummary = async () => {
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
                        title: "Failed to generate summary.",
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

    const openDrawer = ()=>{
        onOpen();
    }

    return (
        <>
            <div className='min-h-32 h-32 bg-stone-400 relative text-white' style={{backgroundImage: 'url(/images/albert-canite-RG2YD21o81E-unsplash.jpg)', backgroundPosition: 'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'scroll'}}>
                <div className='px-4 max-w-6xl mx-auto h-full items-center justify-start flex text-2xl font-semibold z-[999] text-left'>
                    <span className='z-[10]'>{article?.title}</span>
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
                        <BreadcrumbLink href='/articles'>Articles</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='#'>{shortenTitle(article?.title)}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>


            <section className="sectionspace pb-28 min-h-80">
                    <div className="container max-w-6xl mx-auto  pb-12 border-x border-gray-100 mt-8 shadow min-h-screen">
                        <div className=' '>

                            <div className="flex gap-4 flex-wrap border-b">
                                <div className='w-full lg:w-9/12 flex-1 space-y-8 pb-20 px-8'>
                                
                                    <div className='space-y-3'>
                                        {article?.contributors.map((contributor, index) =>{
                                            return (
                                                <div className=' mt-2 flex-col text-sm' key={index}>
                                                    <h4 className='font-semibold capitalize'>{contributor?.public_name??''} {getFullName(contributor)}</h4>
                                                    <i>
                                                        {contributor?.affiliation??''}
                                                    </i>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div className='mt-2 flex-col text-sm'>
                                        <h4 className='font-bold'>Keywords</h4>
                                        <p>
                                            {article?.keywords && JSON.parse(article?.keywords).map((keyword, index, array) =>{
                                                return (
                                                    <span key={index} className='capitalize'>{keyword}{index < array.length - 1 && ', '}</span>
                                                )
                                            })}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className='font-bold text-lg mb-2'>Abstract</h3>
                                        <div className='text-justify'>
                                            <div className="" dangerouslySetInnerHTML={{ __html: article?.abstract}}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full lg:w-3/12 border-l'>
                                    <div>
                                        <div className='pb-4 border-b px-4 flex gap-2'>
                                            <ArticleRecoSearchForm onOpen={onOpen} article={article} setRecommendation={setRecommendation}/>
                                            {recommendation.length > 0 && (<button type='button' onClick={openDrawer} className='btn-primary text-sm rounded p-2'><Menu size={22}></Menu></button>)}
                                        </div>

                                        <div className='pb-4 border-b px-4'>
                                            <div className="rounded relative h-[200px] md:h-[300px] overflow-hidden">
                                                <Image 
                                                    src={`/images/albert-canite-RG2YD21o81E-unsplash.jpg`} 
                                                    alt={'journal one'} 
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

                                        {article?.file ? 
                                            <div className='py-4 border-b px-4'>
                                                <div className='flex items-center justify-start gap-2'>
                                                    <Link href={`${article?.file?.file_url}`} download target='_blank' className='flex items-center justify-center gap-1 rounded-md border border-[#008080] p-2 px-3 text-xs min-w-[90px] text-[#008080]'>
                                                        <DocumentExport/> PDF
                                                    </Link>
                                                    <button disabled={isGeneratingSummary} onClick={getArticleSummary} className='flex items-center justify-center gap-1 rounded-md border border-[#008000] bg-[#008000] p-2 px-3 text-xs min-w-[90px] text-white'>
                                                        {isGeneratingSummary ? <><span className="animate-spin">⏳</span> Summarizing... </>: <><Recycle/> Summarize</>}
                                                    </button>
                                                </div>
                                            </div>
                                        : ''}
                                        <div className='py-4 border-b px-4'>
                                            <div className='flex gap-2 flex-col'>
                                                <span className='text-[13px] min-w-[90px] text-[#0000008A]'>
                                                    Published
                                                </span>
                                                <span className='text-sm text-[#000000DE]'>
                                                    {(article?.datePublished)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className='py-4 border-b px-4 space-y-3'>
                                            <div className='flex gap-2 flex-col'>
                                                <span className='text-[13px] min-w-[90px] text-[#0000008A]'>
                                                    Issue
                                                </span>
                                                <span className='text-sm text-[#000000DE]'>
                                                    {article?.issue?.title}
                                                </span>
                                            </div>
                                            <div className='flex gap-2 flex-col'>
                                                <span className='text-[13px] min-w-[90px] text-[#0000008A]'>
                                                    Section
                                                </span>
                                                <span className='text-sm text-[#000000DE]'>
                                                    {article?.section?.title}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>

            {article ? 
                <ArticleSearchDrawer isOpen={isOpen} onClose={onClose} currentArticle={article} recommendation={recommendation}/>
            : '' }

            <ArticleSummaryDrawer isOpen={isOpenSummaryDrawer} onClose={onCloseSummaryDrawer} currentArticle={article} summary={summary}/>
            
        </>
    )
}

export default SingleArticle
