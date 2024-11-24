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
  } from '@chakra-ui/react'
import { ChevronRight, DocumentExport, Recycle } from '@carbon/icons-react'
import Link from 'next/link'
import { hostUrl } from '../../lib/utilFunctions';
import { LoaderIcon } from '../../components/IconComponent';

const SingleJournal = () => {
    const [journal, setJournal] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageTitle, setPageTitle] = useState(null);
    const router = useRouter();

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
                        setSubmissions(result.submissions);
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
                                <div className='w-full lg:w-8/12'>
                                    <div>
                                        <div>
                                            <h3 className='font-bold text-lg mb-2'>About the Journal</h3>
                                            <div className='text-justify'>
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus fugit delectus laborum blanditiis, rem ipsa deleniti non, dolores mollitia, odio veritatis eligendi voluptatum adipisci aspernatur numquam corporis magnam itaque dolor repellendus. Nam esse placeat vel accusamus neque at et facilis pariatur ratione. Quas blanditiis labore tenetur quaerat fugiat aut magni expedita ratione totam voluptates veritatis odio ex, earum aperiam illo nemo sapiente deleniti delectus qui eius explicabo maxime, porro vero aliquid! Aperiam quidem facilis nisi numquam nemo sed, repellendus, cum officia beatae veritatis, ratione soluta repellat dolore repudiandae! Cum optio, ducimus esse tempora ipsum quisquam facere temporibus nobis sint laborum aperiam quaerat beatae voluptatem sunt ipsam magni, fugiat exercitationem, consequuntur nulla voluptatum perferendis ut quod nesciunt unde! Eius consectetur, natus neque soluta iusto, doloremque architecto nobis facere suscipit hic perferendis accusamus consequuntur expedita impedit eveniet consequatur, animi nemo iste voluptates quasi. Magni repellat inventore laborum aspernatur. Repellat totam maiores exercitationem!
                                            </div>
                                        </div>


                                        <div className='flex items-end justify-end mt-2 flex-col text-sm'>
                                            <p>Editor: <span className='font-semibold'> Udeh Praise</span></p>
                                            {/* <p>Affiliation: <span className='font-semibold'> Udeh Praise</span></p> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-8 py-5'>
                                <div>
                                    <h3 className='text-lg text-left font-bold mb-3'>Articles</h3>
                                    <div>
                                        {!isLoading ?                         
                                            (<div>
                                                {submissions?.length > 0 ? (
                                                    submissions.map((item, index)=>(
                                                        <div className='py-4 flex flex-col gap-3 mb-5' key={index}>
                                                            <Link href={'/journals/' + journal?.id+ '/articles/' + item.id} className='font-bold text-[#008080]'>
                                                                {item.title}
                                                            </Link>
                                                            <span>
                                                                Udeh Praise
                                                            </span>
                                                            <div className='flex items-center justify-start gap-2'>
                                                                <button className='flex items-center justify-center gap-1 rounded-md border border-[#008080] p-2 px-3 text-xs min-w-[90px] text-[#008080]'>
                                                                    <DocumentExport/> PDF
                                                                </button>
                                                                <button className='flex items-center justify-center gap-1 rounded-md border border-[#008000] bg-[#008000] p-2 px-3 text-xs min-w-[90px] text-white'>
                                                                    <Recycle/> Summary
                                                                </button>
                                                            </div>
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
                            </div>
                        </div>
                    </div>
            </section>
        </>
    )
}

export default SingleJournal
