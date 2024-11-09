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
  } from '@chakra-ui/react'
import { ChevronRight, DocumentExport, Recycle } from '@carbon/icons-react'
import Link from 'next/link'
import { hostUrl, shortenTitle } from '../../../../lib/utilFunctions';
import { LoaderIcon } from '../../../../components/IconComponent';

const SingleArticle = () => {
    const [journal, setJournal] = useState(null);
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [pageTitle, setPageTitle] = useState(null);
    const router = useRouter();

    // const params = useParams();
    // const { slug } = params;    
    // const id = slug;

    const { journalId, articleId } = useParams();

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


            <section className="sectionspace pb-28">
                    <div className="container max-w-6xl mx-auto  pb-12 border-x border-gray-100 mt-8 shadow min-h-screen">
                        <div className=' '>

                            <div className="flex gap-4 flex-wrap border-b">
                                <div className='w-full lg:w-9/12 flex-1 space-y-8 pb-20 px-8'>
                                
                                    <div className='space-y-5'>
                                        <div className=' mt-2 flex-col text-sm'>
                                            <h4 className='font-bold'> Udeh Praise</h4>
                                            <p>
                                                Department of Curriculum and Instructional Technology, Faculty of Education, University of Benin
                                            </p>
                                        </div>

                                        <div className='mt-2 flex-col text-sm'>
                                            <h4 className='font-bold'> Udeh Praise</h4>
                                            <p>
                                            Department of Curriculum and Instructional Technology, Faculty of Education, University of Benin
                                            </p>
                                        </div>
                                    </div>

                                    <div className='mt-2 flex-col text-sm'>
                                        <h4 className='font-bold'>Keywords</h4>
                                        <p>
                                            Department, Faculty of Education, University of Benin
                                        </p>
                                    </div>


                                    <div>
                                        <h3 className='font-bold text-lg mb-2'>Abstract</h3>
                                        <div className='text-justify'>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus fugit delectus laborum blanditiis, rem ipsa deleniti non, dolores mollitia, odio veritatis eligendi voluptatum adipisci aspernatur numquam corporis magnam itaque dolor repellendus. Nam esse placeat vel accusamus neque at et facilis pariatur ratione. Quas blanditiis labore tenetur quaerat fugiat aut magni expedita ratione totam voluptates veritatis odio ex, earum aperiam illo nemo sapiente deleniti delectus qui eius explicabo maxime, porro vero aliquid! Aperiam quidem facilis nisi numquam nemo sed, repellendus, cum officia beatae veritatis, ratione soluta repellat dolore repudiandae! Cum optio, ducimus esse tempora ipsum quisquam facere temporibus nobis sint laborum aperiam quaerat beatae voluptatem sunt ipsam magni, fugiat exercitationem, consequuntur nulla voluptatum perferendis ut quod nesciunt unde! Eius consectetur, natus neque soluta iusto, doloremque architecto nobis facere suscipit hic perferendis accusamus consequuntur expedita impedit eveniet consequatur, animi nemo iste voluptates quasi. Magni repellat inventore laborum aspernatur. Repellat totam maiores exercitationem!
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full lg:w-3/12 border-l'>
                                    <div>
                                        <div className='pb-4 border-b px-4'>
                                            <Link href={'/journals/'+journalIdNum} className="rounded relative h-[200px] md:h-[300px] overflow-hidden">
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
                                            </Link>
                                        </div>
                                        <div className='py-4 border-b px-4'>
                                            <div className='flex items-center justify-start gap-2'>
                                                <button className='flex items-center justify-center gap-1 rounded-md border border-[#008080] p-2 px-3 text-xs min-w-[90px] text-[#008080]'>
                                                    <DocumentExport/> PDF
                                                </button>
                                                <button className='flex items-center justify-center gap-1 rounded-md border border-[#008000] bg-[#008000] p-2 px-3 text-xs min-w-[90px] text-white'>
                                                    <Recycle/> Summarize
                                                </button>
                                            </div>
                                        </div>
                                        <div className='py-4 border-b px-4'>
                                            <div className='flex gap-2 flex-col'>
                                                <span className='text-[13px] min-w-[90px] text-[#0000008A]'>
                                                    Published
                                                </span>
                                                <span className='text-sm text-[#000000DE]'>
                                                    2024-07-22
                                                </span>
                                            </div>
                                        </div>
                                        <div className='py-4 border-b px-4'>
                                            <div className='flex gap-2 flex-col'>
                                                <span className='text-[13px] min-w-[90px] text-[#0000008A]'>
                                                    Section
                                                </span>
                                                <span className='text-sm text-[#000000DE]'>
                                                    Articles
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
        </>
    )
}

export default SingleArticle
