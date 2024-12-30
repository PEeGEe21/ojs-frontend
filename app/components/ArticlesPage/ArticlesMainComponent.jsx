'use client';

import React, {useState, useEffect} from 'react'
import Navbar from '../HomePage/Navbar'
import { useRouter } from 'next/navigation'
import { handleRedirect, hostUrl } from '../../lib/utilFunctions';
import { LoaderIcon } from '../IconComponent';
import { ChevronRight, DocumentExport, Recycle } from '@carbon/icons-react';
import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
  } from '@chakra-ui/react'
import Footer from '../HomePage/Footer';
import { Eye } from 'iconsax-react';


const ArticlesMainComponent = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [submissions, setSubmissions] = useState([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const { push } = useRouter();

    useEffect(()=>{
        setLoading(true);
        const getUser = async ()=>{
            // Start loading
            try{
                if (localStorage.getItem('ojs-user')){
                    const data = await JSON.parse(
                        localStorage.getItem("ojs-user")
                    );
                    setUser(data)
                }
            }catch(err){}
        };
        getUser()
    }, [])

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const res = await fetch(hostUrl + `submissions`);
                if (res.ok) {
                    const data = await res.json();
                    const result = data.data
                    setSubmissions(result);
                    setIsLoading(false);
                } else {
                    throw new Error('Failed to fetch the submissions');
                }
            } catch (err) {
                console.error('Error fetching data:', err?.message);
            }
        }

        fetchData();
    }, []);


  return (
    <>
        <Navbar user={user}/>
        <div className='min-h-32 h-32 bg-stone-400 relative text-white' style={{backgroundImage: 'url(/images/albert-canite-RG2YD21o81E-unsplash.jpg)', backgroundPosition: 'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'scroll'}}>
            <div className='px-4 max-w-6xl mx-auto h-full items-center justify-center flex text-2xl font-semibold z-[999]'>
                <span className='z-[10]'>Articles</span>
            </div>
            <div className='absolute w-full h-full top-0 left-0 bg-black opacity-70 pointer-events-none'></div>
        </div>

        {/* breadcrumb */}
        <div className="container max-w-6xl mx-auto px-4 py-4">
            <Breadcrumb spacing='8px' separator={<ChevronRight color='#000' />}>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href='#'>Articles</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </div>

        <section className="px-4 text-left mt-4 sm:mt-10 md:mt-14 xl:mt-20 max-w-6xl mx-auto pb-28">
            <div className='container'>
                <div className="flex flex-wrap gap-8 lg:flex-nowrap">
                    <div className="w-full space-y-8 md:w-full mx-auto">
                        <div className="bg-white rounded-lg px-5 py-4 flex flex-col gap-5 relative border">
                                {!isLoading ?                         
                                    (<div>
                                        {submissions?.length > 0 ? (
                                            submissions.map((item, index)=>(
                                                <div className='py-4 flex flex-col gap-3 pb-5 mb-3 border-b' key={index}>
                                                    <Link href={'/journals/' + item?.journalId+ '/articles/' + item.id} className='font-bold text-[#008080]'>
                                                        {item.title}
                                                    </Link>
                                                    <span>
                                                        Udeh Praise
                                                    </span>
                                                    <div className='flex items-center justify-start gap-2'>
                                                        <Link href={'/journals/' + item?.journalId+ '/articles/' + item.id} className='flex items-center justify-center gap-1 rounded-md border border-[#008080] p-2 px-3 text-xs min-w-[90px] text-[#008080]'>
                                                            <Eye size={14}/> View
                                                        </Link>
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



        </section>
        <Footer/>
    </>
  )
}

export default ArticlesMainComponent
