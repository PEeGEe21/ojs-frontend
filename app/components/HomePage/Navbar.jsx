'use client';
import React, { useState, useEffect, useRef, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import NavbarSearchForm from '../Forms/ArticleRecoSearchForm'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  Portal
} from '@chakra-ui/react';
// import "../../styles/navbar.css";
import { ArrowDown, ArrowDown2, Global, LogoutCurve, SearchNormal1, User } from 'iconsax-react';
import { shortenTitle } from '../../lib/utilFunctions';
import { start } from '../../utils/common';
// import { MenuContext } from '@/app/utils/context';

const Navbar = ({user}) => {
  const { push } = useRouter();
  // const { toggle, showMenu } = useContext(MenuContext) || {};

  // const showMenu = null;
  const showDashboard = (role) =>{
    if(role == 'admin'){
      return true;
    } else if(role == 'author'){
      return true;
    }
    return false;
  }

  // useEffect(() => {
  //   showDashboard(user.user_default_role);
  // }, [] )

  return (
    <>
      
      {!user && (
      <marquee className='bg-[#008080] text-sm'>
        <div className='py-1 text-white'>Join Us Today By <Link href='/auth/signup' className='underline font-semibold'>Signing Up</Link></div>
      </marquee>)}
      
      <header
        className="z-50"
        style={{ position: 'relative' }}
      >
        <div className="container max-w-[90rem] mx-auto px-4">
          <nav className="flex  flex-wrap items-center justify-between py-4">
            <div className="lg:order-1 w-auto lg:w-1/4 lg:text-center">
              <Link
                  href={'/'}
                  className="flex items-center w-full justify-start h-full text-gray-800 capitalize text-2xl font-extrabold "
                >
                  O.J.S
                </Link>
            </div>
            {/* <div className="lg:hidden">
              <button
                className={`navbar-burger flex items-center py-2 px-3 text-[#11161F]  rounded relative transition-all duration-150 ease-linear ${
                  showMenu ? 'open' : ''
                }`}
                id="nav-icon3"
                // onClick={toggle}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
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
            </div> */}

            <div className="order-2 block w-auto text-center">
              <div className="navbar-menu flex items-center justify-end gap-2  ">
                  <Link
                    className="text-[#11161F] hover:text-[#013434] px-2 md:px-3 py-2 menu relative text-center font-semibold group"
                    href={
                      '/'
                    }
                    target="_blank"
                  >
                    <div className='relative'>
                      <span>Docs</span>
                      <span className="block absolute left-0 bottom-0 h-1 bg-[#013434] w-0 group-hover:w-full transition-all duration-300"></span>
                    </div>
                    
                  </Link>

                
              {user ? <>
                  <Link
                    className="text-[#11161F] hover:text-[#013434] px-2 md:px-3 py-2 menu relative text-center font-semibold group"
                    href={
                      '/articles'
                    }
                  >
                    <div className='relative'>
                      <span>Articles</span>
                      <span className="block absolute left-0 bottom-0 h-1 bg-[#013434] w-0 group-hover:w-full transition-all duration-300"></span>
                    </div>
                    
                  </Link>
                  <Link
                    className="text-[#11161F] hover:text-[#013434] px-2 md:px-3 py-2 menu relative text-center font-semibold group"
                    href={
                      '/issues'
                    }
                  >
                    <div className='relative'>
                      <span>Issues</span>
                      <span className="block absolute left-0 bottom-0 h-1 bg-[#013434] w-0 group-hover:w-full transition-all duration-300"></span>
                    </div>
                    
                  </Link>
                  </>
                : <></>
              }
              

                {/* 1E1E1E */}
                {!user ? 
                  <>
                  <Link
                    href="/auth/login"
                    className="text-[#11161F] hover:text-[#013434]  px-3 py-2 rounded-lg text-center font-semibold group"
                  >
                    <div className='relative'>
                      Login
                      <span className="block absolute left-0 bottom-0 h-1 bg-[#013434] w-0 group-hover:w-full transition-all duration-300"></span>
                    </div>
                  </Link>

                  
                  <Link
                    href="/auth/signup"
                    className="text-[#1E1E1E] hover:text-[#013434] px-6 py-2 text-center font-semibold group"
                  >
                    
                    <div className='relative'>
                      Sign up
                      <span className="block absolute left-0 bottom-0 h-1 bg-[#013434] w-0 group-hover:w-full transition-all duration-300"></span>
                    </div>
                  </Link>
                  </>
                  : 
                  <>
                      <Menu className=" bg-card-background" >
                        <MenuButton>
                          <div className="flex items-center justify-start gap-2 bg-card-background rounded-l-full h-auto">
                            <div className='h-10 w-10 rounded-full bg-[#414040] inline-block flex items-center justify-center text-2xl'>
                                <Image 
                                  src={user?.avatar??'/images/avatar-1.png'} alt={'heree'} width={100} height={100} className='w-full h-full rounded-full object-cover' />
                            </div>
  
                            <div className="hidden md:flex flex-col items-start text-sm text-[#353535] pr-2 py-2">
                              <span>
                                {`${
                                  user?.email ? user?.email.substring(0, 15) : ''
                                }`}
                                ...
                              </span>
                            </div>
                          </div>
                        </MenuButton>
                        <Portal className='test-popup'>

                          <MenuList
                              className="bg-[#0F1B2D] py-2 text-white text-sm border border-[#737272] rounded-md z-[99] w-full "
                              minWidth="150px"
                              maxWidth="250px"
                              sx={{
                                '--popper-transform-origin': 'top left !important',
                                transformOrigin: 'top left !important'
                              }}                   
                          >
                            {showDashboard(user?.user_default_role) &&
                              <button
                                onClick={()=>start((user?.user_default_role).toLowerCase(), push)}
                                className="hover:bg-[#008080] transition duration-200 ease-in-out px-3 py-3 bg-[#0F1B2D] text-sm whitespace-nowrap flex items-center justify-start gap-2 text-center text-white w-full"
                              >
                                <User size={14} color="white" className='hidden md:block'/> <span>Dashboard</span>
                              </button>
                            }

                            <MenuItem
                              // onClick={handleLogOut}
                              className="hover:bg-[#008080] transition duration-200 ease-in-out px-3 py-3 bg-[#0F1B2D] text-sm whitespace-nowrap flex items-center justify-start gap-2 text-center text-white"
                            >
                              <LogoutCurve size={14} color="white" className='hidden md:block'/> <span>Sign Out</span>
                            </MenuItem>
                          </MenuList>
                        </Portal>
                      </Menu>
                      {/* <button
                        className="text-[#353535] leading-7 "
                        onClick={()=>start((user?.user_default_role).toLowerCase(), push)}
                      >
                          {shortenTitle(user?.email)}
                      </button> */}
                  </>
                }
              </div>
            </div>
          </nav>
        </div>
      </header>

    </>
  );
};

export default Navbar;
