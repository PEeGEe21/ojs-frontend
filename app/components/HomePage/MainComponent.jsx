'use client'
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Navbar from './Navbar'
import Footer from './Footer'
import EditorsCarousel from './EditorsCarousel'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { handleRedirect, hostUrl } from '../../lib/utilFunctions'
import { ArrowRight, ArrowRight2, ArrowRight3 } from 'iconsax-react'
import { LoaderIcon } from '../IconComponent'
import { blurDataUrl } from '../../lib/constants'


const MainComponent = () => {
    const [user, setUser] = useState(null)
    const [journals, setJournals] = useState([]);
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
        // const role = user?.user_role;
        setTimeout(() => {
            handleRedirect(role, push);
        }, 300);
    }

    return (
        <>
            <Navbar user={user} start={start}/>
            <section className="px-4 text-center mt-4 sm:mt-10 md:mt-14 xl:mt-20 max-w-6xl mx-auto py-8 md:py-20 lg:py-32">
                <h1 className="text-3xl font-bold text-gray-900 md:text-4xl xl:text-6xl xl:leading-tight"> 
                    Journal Management for Seamless Publishing<br className="hidden sm:inline"/> 
                </h1>
                <h2 className="mt-6 leading-snug text-gray-500 xl:mt-5 xl:text-xl"> 
                    Seamlessly Manage, Publish, and Distribute Unlimited Journals<br className="hidden sm:inline"/> 
                    with Ease Across Our Comprehensive Platform. 
                </h2>
                <div className="relative mt-6 flex flex-col items-center justify-center gap-2">
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
                                    className="bg-[#008080] border border-[#008080] text-[#fff] px-6 py-2 text-base rounded-lg flex items-center gap-2 min-h-[48px]">
                                        View Articles  <span><ArrowRight size={15}/></span>
                                </Link>
                            )
                        }

                        
                    </div>
                </div>
            </section>
            
            <section className="py-24 bg-[#f7f7f7]">
                <div className="container max-w-[1440px] mx-auto px-4"> 
                    <div className="flex items-center justify-center flex-row pb-6">
                        <div className="flex flex-col justify-center text-center">
                            <h1 className="text-2xl font-semibold">Our Journals</h1>
                            <h5 className="mt-2 text-sm">Discover Our Most Popular Editions</h5>
                        </div>
                    </div>
                

                    <div className="mt-6 lg:mt-0 lg:flex-1">
                        {!isLoading ?                         
            
                             (<div>
                            
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 my-8  pb-5">
                                    {journals.map((journal, index)=>(
                                        <Link href={`/journals/${journal.id}`} key={journal.id}>
                                            <div className="group rounded-md overflow-hidden hover:shadow-lg transition duration-300 ease border">
                                                <div className="rounded-t relative h-[300px] overflow-hidden">
                                                    <Image
                                                        src={`/images/albert-canite-RG2YD21o81E-unsplash.jpg`}
                                                        alt={journal.name}
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
                                                    <span className="text-gray-900 text-lg mb-2 font-semibold">{journal.name}</span>
                                                    <span className="text-gray-700 leading-none text-sm mb-2">Editor: Udeh Praise</span>
                                                    <span className="text-gray-700 leading-none text-sm mb-2">
                                                        Affiliation: University of Nigeria, Nsukka, Nigeria.
                                                    </span>
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

            <EditorsCarousel/>

            <Footer/>
        </>
    )
}

export default MainComponent;
