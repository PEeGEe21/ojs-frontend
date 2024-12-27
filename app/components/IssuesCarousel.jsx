import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import './testimonial.css'
import Image from 'next/image';
import { blurDataUrl } from '../lib/constants';
import { dateFormat, shortenTitle } from '../lib/utilFunctions';
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

const IssuesCarousel = ({ data }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        margin:'20px',
        gap: '10px',
        // Add navigation arrows
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        centerMode: false,

        centerPadding: '60px',
        className: "left",
        slidesSpacing: 20,
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
                    slidesToShow: 3,
                    centerPadding: '60px',
                },
            },
        ],
    };

    return (
        <section className="sectionspace">
            <div className="container max-w-[1440px] mx-auto px-4 py-5">
                <div className="flex items-center justify-between flex-row">
                    <div className="flex flex-col justify-start">
                        <h1 className="text-lg text-left font-semibold">Issues</h1>
                    </div>
                </div>

                <div>
                    <div className="mt-3 py-5 lg:flex-1 ">
                        <Slider {...settings}>
                                {data.map((issue, index)=>(
                                    <Link href={'/issues/'+issue.id} className="popular-authors relative rounded overflow-hidden shadow-md min-h-[300px]" key={issue.id}>
                                        
                                        <div className="">
                                            <div className="relative overflow-hidden all-authors">
                                                <div className="rounded relative h-[200px] overflow-hidden">
                                                    <Image 
                                                        src={issue?.cover_url??'/images/albert-canite-RG2YD21o81E-unsplash.jpg'} 
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
                                        </div>
                                        

                                        <div className="px-4 py-2 md:py-4 flex flex-col gap-2 text-left min-h-12">

                                            <div className='flex flex-col gap-1'>
                                                <span className="book-title text-gray-900 text-lg">
                                                    {shortenTitle(issue?.title, 36)} 
                                                </span>
                                                {/* <span className="text-gray-700 leading-none text-sm mb-2">{issue?.descriptionPlain}</span> */}
                                                <span className="text-gray-700 leading-none text-sm ">
                                                    {dateFormat(issue?.published_at)}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            
                        </Slider>

                    </div>
                </div>
            </div>
        </section>  
    )
}

export default IssuesCarousel