'use client'
import React from 'react'
import Image from 'next/image'
import Navbar from './Navbar'
import Link from 'next/link'

const MainComponent = () => {
  return (
    <>
        <Navbar/>
        <section className="px-4 text-center mt-4 sm:mt-10 md:mt-14 xl:mt-20 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl xl:text-6xl xl:leading-tight"> 
                Journal Management for Seamless Publishing<br className="hidden sm:inline"/> 
            </h1>
            <h2 className="mt-6 leading-snug text-gray-500 xl:mt-5 xl:text-xl"> 
            Seamlessly Manage, Publish, and Distribute Unlimited Journals<br className="hidden sm:inline"/> 
            with Ease Across Our Comprehensive Platform. 
            </h2>
            <div className="relative mt-6 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-between text-base">
                    <Link className="bg-[#013434] border border-[#013434] text-[#fff] px-6 py-2 text-base" href="/auth/signup">Register with us</Link>
                    <div className="flex items-center">
                        <Link href="#features" className="inline-block w-auto px-2 py-2.5 font-semibold">
                            <span className="border-b-2 border-gray-300">Learn more</span>
                        </Link>
                        
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default MainComponent
