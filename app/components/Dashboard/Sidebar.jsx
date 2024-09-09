'use client';

import React, { useState, useEffect, useContext, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import classNames from 'classnames';
import {
  RecordCircle,
  Profile,
  Profile2User,
  ArrowDown2,
  Add,
  Briefcase,
  More,
  LogoutCurve,
  Setting3,
  ArrowUp2,
  ArrowRight2,
} from 'iconsax-react';
import { useDisclosure } from '@chakra-ui/react';

import Image from 'next/image';
import { Category } from 'react-iconly';
// import { LogoutIcon } from './IconComponent';
import './nav.css';

const Sidebar = ({ user }) => {
  const pathname = usePathname();

  // const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeDropdowns, setActiveDropdowns] = useState([]);
  const [isDropdown, setIsDropdown] = useState(true);

  const wrapperClasses = classNames(
    'h-full sidebar pb-4 bg-[#0F1B2D] lg:flex justify-between shadow-sm scrollbar-change flex-col overflow-y-auto overflow-x-hidden border-r-[0.5px] border-[#F3F4F6] hidden w-48 z-50'
  );


  // const showDropdown = (index) => {
  //   if (activeDropdown === index) {
  //     setActiveDropdown(null); 
  //   } else {
  //     setActiveDropdown(index);
  //   }
  // };


  const showDropdown = (index) => {
    if (activeDropdowns.includes(index)) {
      setActiveDropdowns(activeDropdowns.filter((i) => i !== index));
    } else {
      setActiveDropdowns([...activeDropdowns, index]);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const menuLinks = [
    {
      label: 'Submissions',
      href: '/admin/submissions',
      icon: <Category size={16} />,
      isDropdownMenu: false,
    },
    {
      label: 'Analytics',
      href: '/admin/analytics',
      action: (e, index) => {
        e.preventDefault();
        showDropdown(index);
      },
      icon: <Briefcase size={16} />,
      projects: true,
      isDropdownMenu: false,
      submenu: [
        {
          label: 'Project 1',
          href: '/admin/analytics/project/1',
          icon: <Category size={16} />,
          isDropdownMenu: false,
        }
      ]
    },
    {
      label: 'Users & Roles',
      href: '/admin/users',
      icon: <Profile2User size={16} />,
      isDropdownMenu: true,
      action: (e, index) => {
        e.preventDefault();
        showDropdown(index);
      },
      submenu: [
        {
          label: 'Users',
          href: '/admin/users/users',
          icon: <Category size={16} />,
          isDropdownMenu: false,
        },
        {
          label: 'Roles',
          href: '/admin/users/roles',
          icon: <Category size={16} />,
          isDropdownMenu: false,
        }
      ]
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      action: (e, index) => {
        e.preventDefault();
        showDropdown(index);
      },
      icon: <Setting3 size={16} />,
      isDropdownMenu: true,
      submenu: [
        {
          label: 'Website',
          href: '/admin/settings/website',
          icon: <Category size={16} />,
          isDropdownMenu: false,
        }
      ]
    },
    // {
    //   label: 'Sign Out',
    //   href: '#',
    //   action: (e) => {
    //     e.preventDefault();
    //     signOut();
    //   },
    //   icon: <LogoutCurve size={16} />,
    //   isDropdownMenu: false,
    // },
  ];

  const authorMenuLinks = [
    {
      label: 'Submissions',
      href: '/admin/submissions',
      icon: <Category size={16} />,
      isDropdownMenu: false,
    },
    {
      label: 'Analytics',
      href: '/admin/analytics',
      action: (e, index) => {
        e.preventDefault();
        showDropdown(index);
      },
      icon: <Briefcase size={16} />,
      projects: true,
      isDropdownMenu: false,
      submenu: [
        {
          label: 'Project 1',
          href: '/admin/analytics/project/1',
          icon: <Category size={16} />,
          isDropdownMenu: false,
        }
      ]
    },
    {
      label: 'Users & Roles',
      href: '/admin/users',
      icon: <Profile2User size={16} />,
      isDropdownMenu: true,
      action: (e, index) => {
        e.preventDefault();
        showDropdown(index);
      },
      submenu: [
        {
          label: 'Users',
          href: '/admin/users/users',
          icon: <Category size={16} />,
          isDropdownMenu: false,
        },
        {
          label: 'Roles',
          href: '/admin/users/roles',
          icon: <Category size={16} />,
          isDropdownMenu: false,
        }
      ]
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      action: (e, index) => {
        e.preventDefault();
        showDropdown(index);
      },
      icon: <Setting3 size={16} />,
      isDropdownMenu: true,
      submenu: [
        {
          label: 'Website',
          href: '/admin/settings/website',
          icon: <Category size={16} />,
          isDropdownMenu: false,
        }
      ]
    },
    // {
    //   label: 'Sign Out',
    //   href: '#',
    //   action: (e) => {
    //     e.preventDefault();
    //     signOut();
    //   },
    //   icon: <LogoutCurve size={16} />,
    //   isDropdownMenu: false,
    // },
  ];

  // useEffect(() => {
  //   const dropdownIndices = menuLinks
  //     .map((item, index) => (item.isDropdownMenu ? index : null))
  //     .filter((index) => index !== null);
  //   setActiveDropdowns(dropdownIndices);
  // }, []);
  
  // const handleCloseModal = () => {
  //   onClose();
  // };

  return (
    <>
      <div
        className={wrapperClasses}
        style={{
          transition: 'width 0s ease-in-out 0s ',
        }}
      >
        <div className="flex flex-col">
          <div className="px-4 h-14">
            <div className="flex items-center justify-center py-5 border-b  border-[#F3F4F6]  relative h-full ">
              <div className="px-3 w-full block h-full ">
                {/* <Link
                  href={'/dashboard'}
                  className="flex items-center w-full justify-center h-full"
                >
                  <Image
                    src="/images/logo-white.svg"
                    height={100}
                    width={100}
                    className="transition 300ms ease object-contain w-auto h-auto mr-2"
                    priority
                    alt="logo dash"
                  />
                </Link> */}
              </div>
            </div>
          </div>

          <nav className="mt-6 md:mt-3 grow">
            <div className=" flex-wrap flex gap-4 flex-col">
              {/* (isDropdown && menuItem.projects) || */}
              {menuLinks.map((menuItem, index) => (
                (menuItem.isDropdownMenu ? 
                    <div onClick={(e) => menuItem?.action(e, index)} key={menuItem.label}>
                    <div
                      className={`menu-item w-full font-thin ${
                        pathname == menuItem.href ||
                        pathname.startsWith(`${menuItem.href}/`)
                          ? 'bg-[#034343] text-[#fff]'
                          : 'text-white '
                      }  flex items-center  px-5 transition-colors duration-200 ease-in hover:text-[#fff] justify-between text-sm hover:border-[#008080] hover:bg-[#034343] text-left h-12 cursor-pointer ${
                        isDropdown ? 'active-dropdown' : ''
                      }`}
                    >
                      <div className="flex items-center justify-start flex-grow h-full">
                        <span
                          onClick={menuItem.action}
                          className="text-left mr-2 h-full flex items-center"
                        >
                          {menuItem.icon}
                        </span>
                        <div className=" w-full h-full flex items-center">
                          <div
                            className={classNames(
                              'text-base font-normal w-full flex-1 flex-grow flex items-center h-full'
                            )}
                            
                          >
                            {menuItem.label}
                          </div>{' '}
                        </div>
                      </div>

                      {menuItem.isDropdownMenu && (
                        <div className="flex items-center">
                          <button
                            type='button'
                            className=" rounded-lg flex items-center h-2 w-2 justify-center text-white add-icon"
                          >

                            {activeDropdowns.includes(index)? 
                              <ArrowDown2 size={14} />
                            : <ArrowRight2 size={14} /> }
                          </button>
                        </div>
                      )}
                    </div>


                      {/* {activeDropdown === index  && ( */}
                      {/* {activeDropdowns.includes(index) && ( */}
                        <div className={`${activeDropdowns.includes(index) ? 'h-auto block opacity-100 ' : 'h-0 hidden opacity-0 '}  `}>
                          {menuItem.submenu.map((submenuItem) => (
                            <Link href={submenuItem.href}
                              key={submenuItem.label}
                              className={`menu-item w-full font-thin ${
                                pathname === submenuItem.href ||
                                pathname.startsWith(`${submenuItem.href}/`)
                                  ? 'bg-[#034343] text-[#fff]'
                                  : 'text-white '
                              } flex items-center px-5 transition-colors duration-200 ease-in hover:bg-[#034343]  hover:text-[#fff] justify-between text-sm hover:border-[#008080] text-left h-12`}
                            >
                              <div className="flex items-center justify-start flex-grow h-full">
                                {/* <span className="text-left mr-2 h-full flex items-center">
                                  {submenuItem.icon}
                                </span> */}
                                <div className="w-full h-full flex items-center">
                                  <div className="text-sm font-normal w-full flex-1 flex-grow flex items-center h-full">
                                    {submenuItem.label}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      {/* )} */}
                    </div>
                  : 
                    <Link href={`${menuItem.href}`} key={menuItem.label}>
                      <div
                        className={`menu-item w-full font-thin ${
                          pathname == menuItem.href ||
                          pathname.startsWith(`${menuItem.href}/`)
                            ? 'bg-[#034343] text-[#fff]'
                            : 'text-white '
                        }  flex items-center  px-5 transition-colors duration-200 ease-in hover:text-[#fff] justify-between text-sm hover:border-[#008080] hover:bg-[#034343]  text-left h-12 ${
                          isDropdown ? 'active-dropdown' : ''
                        }`}
                      >
                        <div className="flex items-center justify-start flex-grow h-full">
                          <span
                            onClick={menuItem.action}
                            className="text-left mr-2 h-full flex items-center"
                          >
                            {menuItem.icon}
                          </span>
                          <div className=" w-full h-full flex items-center">
                            <div
                              className={classNames(
                                'text-base font-normal w-full flex-1 flex-grow flex items-center h-full'
                              )}
                              
                            >
                              {menuItem.label}
                            </div>{' '}
                          </div>
                        </div>
                      </div>
                    </Link>
                )
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;