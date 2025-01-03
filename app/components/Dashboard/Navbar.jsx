'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import classNames from 'classnames';
import {
  RecordCircle,
  Profile,
  Global,
  NotificationBing,
  Profile2User,
  LogoutCurve,
  Setting2,
  Setting3,
  Eye,
  SearchNormal1,
  User,
  
} from 'iconsax-react';
import Image from 'next/image';
import { Category } from 'react-iconly';
import { LoaderIcon, LogoutIcon } from '../IconComponent';
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

import { Magicpen, More, NoteAdd, Trash, UserAdd } from 'iconsax-react';
import { JournalContext } from '../../utils/journalContext';
import toast from 'react-hot-toast';
import { DashboardMenuContext } from '../../utils/dashboardContext';
import { logout } from '../../utils/common';
// import { menuLinks } from "../lib/constants";
// import "../navbar.css";

const Navbar = ({ user, isLoadingState , userRole}) => {
  const pathname = usePathname();
  const router = useRouter();

  const contextValue = useContext(DashboardMenuContext) || {};
  const { toggleDashMenu, showDashMenu } = contextValue;
  const { journals, selectedJournal, handleJournalChange, isLoading } = useContext(JournalContext);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const journal = journals.find((j) => j.id === Number(selectedId));
    handleJournalChange(journal);
  };

  const handleLogOut = () => {
    logout();
    router.push('/auth/login');
    toast.success('Successfully logged out')
  };

  // console.log(isLoadingState, 'loading state');
  // const user = {
  //   username: 'praise',
  //   email: 'mailpraiseudeh@gmail.com',
  // };


  return (
    <>
      <header className="bg-[#fff] border-b-[0.5px] border-[#F3F4F6] z-[999] h-14">
        <div className="max-w-7xl mx-auto px-4 lg:px-4 h-full">
          <nav className="flex items-center justify-between py-4 h-full w-full gap-2">
            <div className="md:block sm:hidden h-full">
              <button
                className={`navbar-burger flex items-center py-3 px-3 text-white  rounded relative transition-all duration-150 ease-linear ${
                  showDashMenu ? 'open' : ''
                }`}
                id="nav-icon3"
                onClick={toggleDashMenu}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>

            {userRole !== 'admin' &&
              <div className="h-full">
                <select onChange={handleSelectChange} value={selectedJournal?.id || ''} className='focus:outline-none'>
                  {journals.length > 0 && journals.map((journal) => (
                    <option key={journal.id} value={journal.id}>
                      {journal.name}
                    </option>
                  ))}
                </select>
              </div>
            }
            <div className="w-full   flex-grow flex lg:items-center lg:w-auto justify-end h-full">
              
              <div className="flex items-center w-auto gap-4">

                {/* {isLoadingState ? (
                  <>
                    <span>
                      <LoaderIcon
                        extraClass="text-[#013434]"
                        className="animate-spin mr-1"
                      />
                    </span>
                  </>
                ) : ( */}
                <Link href={'/articles'} className='flex items-center gap-1 bg-[#008080] px-2 py-1 rounded-md text-[#F3F4F6]'>
                  <Eye size={16} /> <span className='hidden md:block'>view site</span>
                </Link>
                <button>
                  <NotificationBing size={22} color="#008080" />
                </button>
                  <div className="relative flex items-center justify-center z-[999] ">
                    <Menu className=" bg-card-background" >
                      <MenuButton>
                        <div className="flex items-center justify-start gap-2 bg-card-background rounded-l-full h-auto">
                          {/* <div>

                          <Image
                            src={`${user?.avatar??'/images/avatar-1.png'}`}
                            alt="alt"
                            width={35}
                            height={35}
                            className="rounded-full object-cover"
                          />
                          </div> */}

                          <div className='h-10 w-10 rounded-full bg-[#414040] inline-block flex items-center justify-center text-2xl'>

                                  <Image src={user?.avatar??'/images/avatar-1.png'} alt={'heree'} width={100} height={100} className='w-full h-full rounded-full object-cover' />

                              </div>

                          <div className="hidden md:flex flex-col items-start text-sm text-[#008080] pr-2 py-2">
                            <span>
                              {`${
                                user?.username ? user?.username.substring(0, 15) : 'praise'
                              }`}
                              ...
                            </span>
                            <span>
                              {`${
                                user?.email ? user?.email.substring(0, 15) : 'test@gmail.com'
                              }`}
                              ...
                            </span>
                          </div>
                        </div>
                      </MenuButton>
                      <Portal className='test-popup'>

                      <MenuList 
                          // transformOrigin="top left"
                          // placement="top-start" // or "bottom-end", "top-start", "top-end", etc.
                          // style={{
                          //   '--popper-transform-origin': 'top left',
                          //   transformOrigin: 'top left'
                          // }}
                          className="bg-[#0F1B2D] py-2 text-white text-sm border border-[#737272] rounded-md z-[99] "
                          minWidth="150px"
                          maxWidth="250px"
                          // sx={{
                          //     '&[data-popper-placed]': {
                          //         transformOrigin: 'top left !important',
                          //         transform: 'translate(0, 10px) !important'
                          //       },                            
                          //     '@media screen and (max-width: 768px)': {
                          //     left: '0 !important',
                          //     right: 'auto !important',
                          //     minWidth: '100px !important',
                          //     maxWidth: '100px !important',
                          //     transformOrigin: 'top left !important',
                          //   },
                          // }}     
                          // pos="absolute"
                          // right="0"
                          sx={{
                            '--popper-transform-origin': 'top left !important',
                            transformOrigin: 'top left !important'
                          }}                   
                      >
                        {/* <MenuItem
                          icon={<Profile2User size={14} />}
                          
                          className="hover:bg-[#034343] transition duration-200 ease-in-out p-2 bg-[#008080]"
                        >
                          Profile
                        </MenuItem> */}
                        {/* <MenuItem
                          icon={<Setting3 size={14} />}
                          className="hover:bg-[#034343] transition duration-200 ease-in-out p-2 bg-[#008080]"
                        >
                          Settings
                        </MenuItem> */}
                        <Link
                          // icon={<LogoutCurve size={14} color="red" />}
                          // onClick={logout}
                          href={'/profile'}
                          className="hover:bg-[#008080] transition duration-200 ease-in-out px-3 py-3 bg-[#0F1B2D] text-sm whitespace-nowrap flex items-center justify-start gap-2 text-center text-white"
                        >
                          <User size={14} color="white" className='hidden md:block'/> <span>Profile</span>
                        </Link>
                        <MenuItem
                          // icon={<LogoutCurve size={14} color="red" />}
                          onClick={handleLogOut}
                          className="hover:bg-[#008080] transition duration-200 ease-in-out px-3 py-3 bg-[#0F1B2D] text-sm whitespace-nowrap flex items-center justify-start gap-2 text-center text-white"
                        >
                          <LogoutCurve size={14} color="white" className='hidden md:block'/> <span>Sign Out</span>
                        </MenuItem>
                      </MenuList>
                      </Portal>

                    </Menu>
                  </div>
                {/* )} */}
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
