import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import './testimonial.css'
import Image from 'next/image';
import { blurDataUrl } from '../../lib/constants';

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

const EditorsCarousel = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        margin:'20px',
        gap: '10px',
        // Add navigation arrows
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        // Add spacing between slides
        centerMode: true,

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
    

    const EditorsList = [
        {
            id: 1,
            image: '/images/users/300_15.jpg',
            name: 'Chris Holland',
            books_published: 300,
        },
        {
            id: 2,
            image: '/images/users/300_17.jpg',
            name: 'Mary Smith',
            books_published: 30,
    
        },
        {
            id: 3,
            image: '/images/users/300_25.jpg',
            name: 'Travis Carter',
            books_published: 2000,
    
        },
        {
            id: 4,
            image: '/images/users/300_8.jpg',
            name: 'Song Yu Jin',
            books_published: 30,
    
        },
        {
            id: 5,
            image: '/images/users/300_5.jpg',
            name: 'Allyson Witherers',
            books_published: 30,
    
        },
        
    ];

    return (
        <section className="py-24 sectionspace">
            <div className="container max-w-[1440px] mx-auto px-4 py-5">
                <div className="border-b flex items-center justify-between flex-row pb-6">
                    <div className="flex flex-col justify-start">
                        <h5 className="mb-2 text-sm">See our Editors</h5>
                        <h1 className="text-2xl">Our Editors</h1>
                    </div>
                </div>

                <div>
                    <div className="mt-3 lg:mt-6 py-5 lg:flex-1 ">
                        <Slider {...settings}>
                                {EditorsList.map((editor, index)=>(
                                    <div className="popular-authors relative rounded overflow-hidden shadow-md " key={editor.id}>
                                        
                                        <div className="">
                                            <div className="relative overflow-hidden all-authors">
                                                <div className="rounded relative h-[200px] md:h-[300px] overflow-hidden">
                                                    <Image 
                                                        src={editor.image} 
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
                                        

                                        <div className="px-4 py-2 md:py-4 flex flex-col gap-2 text-left mt-0 lg:mt-2">

                                            <div>
                                                <span className="book-title text-gray-900 text-lg">{editor.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            
                        </Slider>

                    </div>
                </div>
            </div>
        </section>  
    )
}

export default EditorsCarousel