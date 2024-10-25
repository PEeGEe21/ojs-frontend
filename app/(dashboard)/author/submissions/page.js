"use client"
import { Progress, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, useToast } from "@chakra-ui/react";
import React, {useState} from 'react'
// import AllSubmissions from './_components/AllSubmissions';
import { SearchNormal1 } from "iconsax-react";
import Link from "next/link";

const Submissions = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <div>
        <h1 className='font-bold text-2xl'>Submissions</h1>
      </div>

      <div className="mt-8">

          <div className="flex flex-wrap items-center justify-between gap-3 lg:flex-nowrap">
              <div className="flex items-center w-full gap-2 justify-end">
                <div className=" relative rounded-full  items-center  w-full max-w-[563px] h-10 ">
                  <div className="absolute inset-y-0 left-0 flex items-center h-full pl-1 pointer-events-none">
                    <span className="px-3 text-gray-500">
                      <SearchNormal1 size={22} />
                    </span>
                  </div>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    value={searchQuery}
                    onChange={(event) => {
                      const value = event.target.value;
                      setSearchQuery(value);
                    }}
                    className="border border-[#3B3939] py-2 px-4  block w-full pl-12 pr-12 sm:text-sm rounded-full h-full focus:outline-none bg-transparent text-[#3B3939]"
                    placeholder="Search"
                  />
                </div>
                <div className="text-md  flex flex-row items-center justify-end gap-6  w-full  mt-3 md:mt-0 flex-wrap md:flex-nowrap ">
                    <Link
                        href={"submissions/create"}
                        className="w-auto whitespace-nowrap py-2 md:py-3 px-3 md:px-5 bg-[#313131] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 "
                    >
                        <p className="">Create Submission</p>
                    </Link>
                </div>
              </div>


              {/* <div className="flex items-center justify-end gap-2">
                <select
                  name="status"
                  id="status"
                  defaultValue={0}
                  className="border border-[#3B3939] py-2 px-4 text-sm block rounded-full h-full focus:outline-none bg-[#212121] text-white selection:bg-black"
                >
                  <option value={0}>All Status</option>
                  <option>Completed</option>
                </select>

                <select
                  name="status"
                  id="status"
                  defaultValue={0}
                  className="border border-[#3B3939] py-2 px-4 text-sm block rounded-full h-full focus:outline-none bg-[#212121] text-white selection:bg-black"
                >
                  <option value={0}>No sort</option>
                  <option>Completed</option>
                </select>

                <select
                  name="status"
                  defaultValue={0}
                  id="status"
                  className="border border-[#3B3939] py-2 px-4 text-sm block rounded-full h-full focus:outline-none bg-[#212121] text-white selection:bg-black"
                >
                  <option value={0}>Types</option>
                  <option>Completed</option>
                </select>
              </div> */}
          </div>

          <div className="py-2 mb-5 rounded-lg">
            <div className="relative w-full py-4 shadow-box">
              <Tabs position="relative" variant="unstyled" isLazy>
                <TabList className="whitespace-nowrap gap-3 text-sm">
                  <Tab
                    className=" border-[#3B3939] text-[#313131] "
                    _hover={{ color: "#FFFFFF", backgroundColor:"#313131",  borderTop:"1px", borderTopColor: "#FFF" }}
                    _selected={{ color: "#313131", backgroundColor:"#FFFFFF", borderTop:"1px", borderTopColor: "#0F1B2D"}}
                  >
                    <span className="py-2 min-w-[150px]">
                      My Submissions
                    </span>
                  
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel className="px-0 py-0">
                    <div>
                      <div className="bg-white min-h-[500px]">


                        {/* <AllSubmissions
                          searchQuery={searchQuery}
                          // viewType={viewType}
                        /> */}
                      </div>
                    </div>

                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Submissions
