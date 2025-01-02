import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import './testimonial.css'
import Image from 'next/image';
import { blurDataUrl } from '../../lib/constants';
import { getFullName } from '../../utils/common';
import Link from 'next/link';

// Custom arrow components
const NextArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        style={{ right: '10px' }}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
        </svg>
    </button>
);

const PrevArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        style={{ left: '10px' }}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
            />
        </svg>
    </button>
);

const EditorsCarousel = ({EditorsList}) => {
    const settings = {
        dots: false,
        infinite: EditorsList.length > 2,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        margin:'20px',
        gap: '10px',
        // Add navigation arrows
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        // Add spacing between slides
        centerMode: false,

        centerPadding: '60px',
        className: "center",
        slidesSpacing: 20,
        // Improved responsive breakpoints
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '20px',
                    arrows: false, // Hide arrows on mobile
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    // slidesToScroll: 1,
                    centerPadding: '40px',
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    // slidesToScroll: 1,
                    centerPadding: '50px',
                },
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 5,
                    centerPadding: '60px',
                },
            },
        ],
    };
    

    // const EditorsList = [
    //     {
    //         id: 1,
    //         image: '/images/users/300_15.jpg',
    //         name: 'Chris Holland',
    //         books_published: 300,
    //     },
    //     {
    //         id: 2,
    //         image: '/images/users/300_17.jpg',
    //         name: 'Mary Smith',
    //         books_published: 30,
    
    //     },
    //     {
    //         id: 3,
    //         image: '/images/users/300_25.jpg',
    //         name: 'Travis Carter',
    //         books_published: 2000,
    
    //     },
    //     {
    //         id: 4,
    //         image: '/images/users/300_8.jpg',
    //         name: 'Song Yu Jin',
    //         books_published: 30,
    
    //     },
    //     {
    //         id: 5,
    //         image: '/images/users/300_5.jpg',
    //         name: 'Allyson Witherers',
    //         books_published: 30,
    
    //     },
        
    // ];

    return (
        <section className="py-24 sectionspace">
            <div className="container max-w-[90rem] mx-auto px-4 py-5">
                <div>
                    <div className='grid gap-3 grid-cols-1 md:grid-cols-2 items-center'>

                        <div>
                            <div className='flex flex-col gap-4 max-w-[576px]'>
                                <h2 className='font-semibold text-xl md:text-2xl lg:text-4xl leading-[37.8px]'>
                                    Get to Know <span className='underline underline-offset-8' style={{textDecorationColor: '#008080'}}>Our Esteemed Team of Editors</span>
                                </h2>
                                <p className='max-w-[42rem]'>
                                    Collaborate with dedicated experts who ensure the quality and credibility of your submissions, helping to elevate the impact of your research.
                                </p>
                                {/* <ul className='list-disc pl-4 space-y-6 mt-4 text-sm'>
                                    <li className='text-[#52525b]'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, sapiente!</p></li>
                                    <li className='text-[#52525b]'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, sapiente!</p></li>
                                    <li className='text-[#52525b]'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, sapiente!</p></li>
                                </ul> */}
                                <div className='w-full flex items-start justify-start'>
                                    <Link
                                        href="/auth/signup" 
                                        className="flex items-center justify-center rounded-md border border-[#008080] p-3 px-5 text-sm min-w-[200px] h-12 text-white bg-[#008080]">Get Started
                                    </Link>
                                </div> 
                            </div>

                        </div>
                        <div>
                            {EditorsList && (EditorsList.length > 0) && (
                            <Slider {...settings}>
                                    {EditorsList?.map((editor, index)=>(
                                        <div className="popular-authors relative rounded overflow-hidden shadow-md " key={editor?.id}>
                                            <div className="">
                                                <div className="relative overflow-hidden all-authors">
                                                    <div className="rounded-t relative h-[250px] overflow-hidden">
                                                        <Image 
                                                            src={editor?.image?? '/images/avatar-1.png'} 
                                                            alt={getFullName(editor)} 
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
                                            </div>
                                            
                                            <div className="px-4 py-2 md:py-4 flex flex-col gap-2 text-left min-h-24">
                                                <div>
                                                    <span className="book-title text-gray-900 text-lg">{getFullName(editor)}</span><br/>
                                                    <span className="book-title text-gray-900 text-sm"><i>{editor?.profile?.affiliation}</i></span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                
                            </Slider>
                            )}
                        </div>                        

                    </div>
                </div>
            </div>
        </section>  
    )
}

export default EditorsCarousel