'use client';
import React, { useState, useEffect, useRef, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import "../../styles/navbar.css";
import { ArrowDown, ArrowDown2, Global } from 'iconsax-react';
// import { MenuContext } from '@/app/utils/context';

const Navbar = () => {
  // const { toggle, showMenu } = useContext(MenuContext) || {};
  const showMenu = null;
  return (
    <>
      <header
        className="z-50"
        style={{ position: 'relative' }}
      >
        <div className="container mx-auto max-w-[1440px] px-4">
          <nav className="flex  flex-wrap items-center justify-between py-4">
            <div className="lg:order-1 w-auto lg:w-1/4 lg:text-center">
              <Link
                href="/"
                className="text-xl text-gray-800 font-semibold font-heading"
              >
                {/* <Image
                  src="/images/logo.svg"
                  width={150}
                  height={150}
                  alt="logo"
                  priority
                  className=""
                /> */}
              </Link>
            </div>
            <div className="lg:hidden">
              <button
                className={`navbar-burger flex items-center py-2 px-3 text-[#11161F]  rounded relative transition-all duration-150 ease-linear ${
                  showMenu ? 'open' : ''
                }`}
                id="nav-icon3"
                // onClick={toggle}
              >
                {/* <div id="nav-icon3"> */}
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {/* </div> */}
              </button>
              <nav
                id="mobile-nav"
                className={`absolute top-full z-20 left-0 w-full px-4 overflow-hidden transition-all duration-300 ease-in-out  shadow-lg ring-1 ring-gray-900/5 bg-[#008080] mainNav ${
                  showMenu ? 'show' : ''
                }`}
              >
                <ul className="bg-[#008080] py-4">
                  <li>
                    <Link
                      className="flex text-white hover:bg-gray-800/10 py-2 px-2 rounded-[4px]"
                      href="/"
                    >
                     How it works
                    </Link>
                  </li>
                  <li>
                    <Link
                      // className="flex text-white hover:bg-gray-800/10 px-2 py-2 rounded-[4px]"
                      className="bg-[#FFCC29] border border-[#FFCC29] text-[#1E1E1E] px-3 py-2 rounded-lg w-1/2 h-10 text-center text-sm flex items-center justify-center  mt-4"
                      href="/auth/login"
                    >
                      Get Started
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="hidden lg:order-2 lg:block w-full lg:w-auto lg:text-center">
              <div className="navbar-menu flex items-center justify-end gap-5  ">
                <Link
                  className="text-[#11161F] hover:text-[#013434] px-6 py-2 menu relative text-center font-semibold group"
                  href={
                    '/'
                  }
                  target="_blank"
                >
                  <div className='relative'>
                    How it works
                    <span className="block absolute left-0 bottom-0 h-1 bg-[#013434] w-0 group-hover:w-full transition-all duration-300"></span>
                  </div>
                  
                </Link>
                

                <Link
                  href="/auth/login"
                  className="text-[#11161F] hover:text-[#013434]  px-6 py-2 rounded-lg text-center font-semibold group"
                >
                  <div className='relative'>
                    Login
                    <span className="block absolute left-0 bottom-0 h-1 bg-[#013434] w-0 group-hover:w-full transition-all duration-300"></span>
                  </div>
                </Link>

                {/* 1E1E1E */}
                <Link
                  href="/auth/signup"
                  className="text-[#1E1E1E] hover:text-[#013434] px-6 py-2 text-center font-semibold group"
                >
                  
                  <div className='relative'>
                    Sign up
                    <span className="block absolute left-0 bottom-0 h-1 bg-[#013434] w-0 group-hover:w-full transition-all duration-300"></span>
                  </div>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
