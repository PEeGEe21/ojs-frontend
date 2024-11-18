'use client';

import React, {useState, useEffect} from 'react'
import Navbar from '../HomePage/Navbar'
import { useRouter } from 'next/navigation'
import { handleRedirect, hostUrl, slugify } from '../../lib/utilFunctions';
import Link from 'next/link';
import Image from 'next/image';
import { LoaderIcon } from '../IconComponent';
import { blurDataUrl } from '../../lib/constants';
import Footer from '../HomePage/Footer';
import { getFullName } from '../../utils/common';


const JournalMainComponent = () => {
    const [user, setUser] = useState(null)
    const [journals, setJournals] = useState([]);
    const [selectedJournal, setSelectedJournal] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
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

    useEffect(() => {
      const fetchJournals = async () => {
        // setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(hostUrl + 'journals');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setJournals(data.data);        
        } catch (error) {
          console.error('Failed to fetch journals:', error);
          setError('Failed to fetch journals. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchJournals();
    }, []);

    const start = (role) => {
        setTimeout(() => {
            handleRedirect(role, push);
        }, 300);
    }

    return (
        <>
            <div className='min-h-32 h-32 bg-stone-400 relative text-white' style={{backgroundImage: 'url(/images/albert-canite-RG2YD21o81E-unsplash.jpg)', backgroundPosition: 'center bottom', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'scroll'}}>
                <div className='px-4 max-w-6xl mx-auto h-full items-center justify-center flex text-2xl font-semibold z-[999]'>
                    <span className='z-[10]'>Journals</span>
                </div>
                <div className='absolute w-full h-full top-0 left-0 bg-black opacity-70 pointer-events-none'></div>

                {/* <Image src={'/images/albert-canite-RG2YD21o81E-unsplash.jpg'} 
                    alt="" 
                    className='w-full h-full' 
                    width={100} 
                    height={100}
                /> */}
            </div>

            <section className="sectionspace pb-32">
                <div className="container max-w-[1440px] mx-auto px-4">

                    <div className="mt-6 lg:flex-1">
                        {!isLoading ?                         
            
                            (<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 scroll-container pb-5 md:py-0">
                                {journals.map((journal, index)=>{
                                    return(
                                        <Link href={`/journals/${journal.id}`} key={journal.id}>
                                            <div className="group rounded-md overflow-hidden hover:shadow-lg transition duration-300 ease border  ">
                                                <div className="rounded-t relative h-[200px] md:h-[300px] overflow-hidden">
                                                        <Image 
                                                            src={`/images/albert-canite-RG2YD21o81E-unsplash.jpg`} 
                                                            alt={journal.name} 
                                                            className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105" 
                                                            height={300}
                                                            width={800}
                                                            quality={100}
                                                            sizes="(max-width: 768px) 100vw, 800px"
                                                            placeholder="blur"
                                                            blurDataURL={blurDataUrl}
                                                        />
                                                </div>

                                                <div className="py-4 mb-4 flex flex-col gap-2 px-5 text-center">
                                                    <span className=" text-gray-900 text-lg mb-2 font-semibold">{journal.name}</span>
                                                    {/* <span className="text-gray-700 leading-none text-sm mb-2 ">Editor: Udeh Praise</span> */}
                                                    <span className="text-gray-700 leading-none text-sm mb-2">Editor: <b className='capitalize'>{getFullName(journal?.editor)}</b></span>
                                                    <span className="text-gray-700 leading-none text-sm mb-2 ">
                                                            Affiliation: University of Nigeria, Nsukka, Nigeria.
                                                    </span>
                                                </div>
                                            </div> 
                                        </Link> 
                                    )
                                })}   
                            </div>)

                        :
                            (<div className="h-full flex items-center justify-center">
                                <LoaderIcon extraClass="text-black h-8 w-6"/>
                            </div>)
                        }
                    </div>
                
                </div>
            </section>
        </>
    )
}

export default JournalMainComponent
