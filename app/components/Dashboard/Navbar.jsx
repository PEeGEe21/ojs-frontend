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
} from '@chakra-ui/react';

import { Magicpen, More, NoteAdd, Trash, UserAdd } from 'iconsax-react';
// import { menuLinks } from "../lib/constants";
// import "../navbar.css";

const Navbar = ({ user, isLoadingState }) => {
  const pathname = usePathname();
  // console.log(isLoadingState, 'loading state');
  // const user = {
  //   username: 'praise',
  //   email: 'mailpraiseudeh@gmail.com',
  // };

  const showDashMenu = null;
  return (
    <>
      <header className="bg-[#fff] border-b-[0.5px] border-[#F3F4F6] z-[999] h-14 ">
        <div className="max-w-7xl mx-auto px-4 lg:px-4 h-full">
          <nav className="flex items-center justify-between flex-wrap py-4 h-full ">
            {/* <div className="flex items-start justify-start flex-shrink-0 text-white mr-6">
              <Link
                href="/dashboard"
                className="text-xl  font-semibold font-heading"
              >
                <Image
                  src="/images/logo.svg"
                  alt="logo"
                  width={150}
                  height={100}
                />
              </Link>
            </div> */}
            <div className="md:block sm:hidden h-full">
              <button>
                <NotificationBing size={22} color="#008080" />
              </button>
            </div>
            <div className="w-full hidden  flex-grow lg:flex lg:items-center lg:w-auto justify-end h-full">
              
              <div className="lg:flex lg:items-center lg:w-auto gap-4">

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
                  <div className="relative flex items-center justify-center z-[999] ">
                    <Menu className=" bg-card-background">
                      <MenuButton>
                        <div className="flex items-center justify-start gap-2 bg-card-background rounded-l-full h-auto">
                          <Image
                            src={`${user?.image ? user?.image : '/images/avatar-1.png'}`}
                            alt=""
                            width={35}
                            height={35}
                            className="rounded-full"
                          />

                          <div className="flex flex-col items-start text-sm text-[#008080] pr-2 py-2">
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
                      <MenuList
                        className="bg-[#008080] py-3 text-white text-sm border border-[#737272] rounded-md z-[99]"
                        minWidth="150px"
                        maxWidth="150px"
                      >
                        <MenuItem
                          icon={<Profile2User size={14} />}
                          
                          className="hover:bg-[#034343] transition duration-200 ease-in-out p-2"
                        >
                          Profile
                        </MenuItem>
                        <MenuItem
                          icon={<Setting3 size={14} />}
                          className="hover:bg-[#034343] transition duration-200 ease-in-out p-2"
                        >
                          Settings
                        </MenuItem>
                        <MenuItem
                          icon={<LogoutCurve size={14} color="red" />}
                          className="hover:bg-[#034343] transition duration-200 ease-in-out p-2"
                        >
                          Sign Out
                        </MenuItem>
                      </MenuList>
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
