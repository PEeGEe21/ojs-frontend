'use client'
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Navbar from './Navbar'
import Footer from './Footer'
import Faq from './Faq'
import EditorsCarousel from './EditorsCarousel'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { handleRedirect, hostUrl, slugify } from '../../lib/utilFunctions'
import { ArrowRight, ArrowRight2, ArrowRight3 } from 'iconsax-react'
import { LoaderIcon } from '../IconComponent'
import { blurDataUrl, forProjectOwners, ourUsersComments } from '../../lib/constants'
import { getFullName } from '../../utils/common'


const MainComponent = () => {
    const [user, setUser] = useState(null)
    const [journals, setJournals] = useState([]);
    const [editors, setEditors] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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

    const fetchEditors = async () => {
        // setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(hostUrl + 'users/role/4');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setEditors(data.users);
        } catch (error) {
          console.error('Failed to fetch editors:', error);
          setError('Failed to fetch editors. Please try again later.');
        } finally {
          setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchJournals();
        fetchEditors();
    }, []);


    return (
        <>
            <Navbar user={user}/>
            <section className="px-4 text-left max-w-[90rem] mx-auto pt-16 pb-20">
                <div className='max-w-3xl '>

                    <h1 className="text-3xl font-bold text-gray-900 md:text-4xl xl:text-6xl leading-tight lg:leading-[3.75rem]"> 
                        Journal Management for Seamless Publishing<br className="hidden sm:inline"/> 
                    </h1>
                    <h2 className="mt-6 leading-snug text-gray-500 xl:mt-5 xl:text-xl"> 
                        Seamlessly Manage, Publish, and Distribute Unlimited Journals<br className="hidden sm:inline"/> 
                        with Ease Across Our Comprehensive Platform. 
                    </h2>
                    <div className="relative mt-6 flex flex-row items-center justify-start gap-2">
                        <div className="flex items-center justify-between text-base">

                            {!user ? 
                                (
                                    <>

                                        <Link className="bg-[#013434] border border-[#013434] text-[#fff] px-6 py-2 text-base" href="/auth/signup">Register with us</Link>
                                        <div className="flex items-center">
                                            <Link href="#features" className="inline-block w-auto px-2 py-2.5 font-semibold">
                                                <span className="border-b-2 border-gray-300">Learn more</span>
                                            </Link>
                                        </div>
                                    </>

                                ):( 
                                    <Link 
                                        href={'/articles'} 
                                        className="bg-[#008080] hover:bg-[#062F2F] border border-[#008080] hover:border-[#062F2F] text-[#fff] px-6 py-2 text-base rounded-lg flex items-center gap-2 min-h-[48px]">
                                            View Articles  <span><ArrowRight size={15}/></span>
                                    </Link>
                                )
                            }

                            
                        </div>
                    </div>
                </div>
            </section>
            
            <section className='py-12 lg:py-24'>
                <div className='container max-w-[90rem] mx-auto px-4'>
                    <div className='mb-5 lg:mb-[64px] text-center max-w-3xl mx-auto space-y-4'>
                        <h2 className='font-semibold text-xl md:text-2xl lg:text-4xl leading-[37.8px]'>
                            Our AI-Enhanced Open Journal System Features
                        </h2>
                        <p className='text-base leading-[28px]'>
                            Streamline your academic publishing workflow with our innovative AI-powered tools designed to enhance efficiency, accuracy, and scholarly impact.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-6">
                    {forProjectOwners.map((item, index)=>(
                        <div key={index} className='card flex flex-col gap-5 bg-white border border-[#eaecf0] rounded-2xl py-4 px-4 min-h-[200px] md:max-h-[250px] lg:max-h-full'>
                            <div>
                                <span className='card-icon h-14 w-14 rounded-full p-3 text-[#FFA178] bg-[#414040] inline-block flex items-center justify-center text-2xl'>
                                    {item.icon}
                                </span>              
                            </div>

                            <div className='card-body flex flex-col gap-3'>
                                <div className='card-title text-lg leading-6 font-semibold'>
                                    {item.title}
                                </div>
                                <div className='card-subtitle text-base leading-5'>
                                    {item.subtitle}
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </section>

            {journals.length > 0 && (
                <section className="py-24 bg-[#f7f7f7]">
                    <div className="container max-w-[90rem] mx-auto px-4"> 
                        <div className="flex items-center justify-center flex-row pb-6">
                            {/* <div className="flex flex-col justify-center text-center">
                                <h2 className='font-semibold text-xl md:text-2xl lg:text-4xl leading-[37.8px]'>
                                    Explore Our Journals and Featured Editions
                                </h2>
                                <h5 className="mt-2 text-sm">
                                </h5>
                            </div> */}
                            <div className='mb-5 lg:mb-[64px] text-center max-w-3xl mx-auto space-y-4'>
                                <h2 className='font-semibold text-xl md:text-2xl lg:text-4xl leading-[37.8px]'>
                                Explore Our Journals and Featured Editions
                                </h2>
                                <p className='text-base leading-[28px]'>
                                Dive into our collection of journals and explore the most popular editions, featuring groundbreaking research and insightful articles.
                            </p>
                        </div>
                        </div>

                        
                    

                        <div className="mt-6 lg:mt-0 lg:flex-1">
                            {!isLoading ?                         
                
                                (<div>
                                
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 my-8 pb-5">
                                        {journals.slice(0, 3).map((journal, index)=>(
                                            <Link href={`/journals/${journal.id}`} key={journal.id}>
                                                <div className="group rounded-md overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease border">
                                                    <div className="rounded-t relative h-[300px] overflow-hidden">
                                                        <Image
                                                            src={`${journal?.file_url??'/images/albert-canite-RG2YD21o81E-unsplash.jpg'}`} 
                                                            alt={`${journal?.slug ? slugify(journal?.slug) : journal?.name}`} 
                                                            className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105 "
                                                            height={300}
                                                            width={800}
                                                            quality={100}
                                                            sizes="(max-width: 768px) 100vw, 800px"
                                                            placeholder="blur"
                                                            blurDataURL={blurDataUrl}
                                                        />
                                                        <div className="tg-hovercontent"></div>
                                                    </div>
                                            
                                                    <div className="py-4 mb-4 flex flex-col gap-2 px-5 text-center">
                                                        <span className="text-gray-900 text-xl mb-2 font-semibold">{journal.name}</span>
                                                        {/* <span className="text-gray-700 leading-none text-sm mb-2">Editor: <b className='capitalize'>{getFullName(journal?.editor)}</b></span> */}
                                                        {/* <span className="text-gray-700 leading-none text-sm mb-2">
                                                            Affiliation: University of Nigeria, Nsukka, Nigeria.
                                                        </span> */}
                                                    </div>
                                                </div>
                                            </Link>
                                        
                                        ))}   
                                    </div>

                                    <div className='mx-auto flex items-center justify-center'>
                                        <Link href="/journals" className="flex items-center justify-center rounded-md border border-[#008080] p-3 px-5 text-sm min-w-[250px] text-white bg-[#008080]">View All Journals</Link>
                                    </div> 
                                
                                </div>)

                            :
                                (<div className="h-full flex items-center justify-center">
                                    <LoaderIcon extraClass="text-black h-8 w-6"/>
                                </div>)
                            }
                        </div>


                    
                    </div>
                </section>
            )}

            <EditorsCarousel EditorsList={editors}/>

            <section className='py-12 lg:py-24 bg-[#f9fafb]'>
                <div className='container max-w-[90rem] mx-auto px-4'>
                    <div className='mb-5 text-center max-w-3xl mx-auto'>
                        <h2 className='font-semibold text-xl md:text-2xl lg:text-4xl leading-[37.8px]'>
                            Hear From <span className='bg-[#008080] px-2 text-white rounded'>Top-Tier</span> Experts
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 py-6">
                        {ourUsersComments.map((item, index)=>(
                            <div key={index} className='card flex flex-col gap-10 bg-white border border-[#eaecf0]  p-12 '>
                                <div className='flex flex-col gap-3'>
                                    <p className='card-subtitle text-base leading-6 whitespace-pre-wrap text-[#52525b]'>
                                        {item.subtitle}
                                    </p>
                                </div>

                                <div className='card-body flex justify-between w-full items-center gap-3'>
                                    <div className='flex flex-col gap-1 text-[0.875rem]'>
                                        <div className='card-title leading-6 font-medium '>
                                            {item.name}
                                        </div>
                                        <div className='leading-5 text-[#52525b] text-sm'>
                                            {item.expertise}
                                        </div>
                                    </div>
                                    <span className='card-icon h-14 w-14 rounded-full text-[#FFA178] bg-[#414040] inline-block flex items-center justify-center text-2xl'>
                                        {/* <div className="rounded-t relative h-10 w-10 overflow-hidden"> */}

                                            <Image src={item?.image??'/images/avatar-1.png'} alt={'heree'} width={100} height={100} className='w-full h-full rounded-full' />
                                        {/* </div> */}
                                        {/* {item.icon} */}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Faq/>
            
            <Footer/>
        </>
    )
}

export default MainComponent;
