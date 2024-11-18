"use client"
import { Progress, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, useToast } from "@chakra-ui/react";
import React, {useEffect, useState} from 'react'
import { SearchNormal1 } from "iconsax-react";
import JournalsMainTable from '../../../../components/Tables/JournalsMainTable'
import SectionsTable from '../../../../components/Tables/SectionsTable'
import Link from "next/link";
import { hostUrl } from "../../../../lib/utilFunctions";
import { SectionsData } from "../../../../lib/constants";

const Settings = () => {
  const [viewType, setViewType] = useState(0);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [sectionsDataSource, setSectionsDataSource] = useState([]);

  useEffect(() =>{
    const getUser = async ()=>{
      try{
          if (localStorage.getItem('ojs-user')){
              const data = await JSON.parse(
                  localStorage.getItem("ojs-user")
              );
              setUser(data)
          }else{
              router.push("/auth/login")
          }
      }catch(err){}
    };

    getUser();
  }, [])

  const fetchInitData = async () => {
    try {
        setIsLoading(true);
        const res = await fetch(hostUrl + 'users/init-data');
        if (res.ok) {
            const result = await res.json();
            setUsers(result.users);
        }
    } catch (err) {
        console.error('Error fetching data:', err?.message);
    } finally {
        setIsLoading(false);
    }
  }

  const fetchData = async () => {
      try {
          setIsLoading(true);
          const res = await fetch(hostUrl + 'journals/all');
          if (res.ok) {
              const result = await res.json();
              setDataSource(result.data);
          }
      } catch (err) {
          console.error('Error fetching data:', err?.message);
      } finally {
          setIsLoading(false);
      }
  }

  const fetchSectionsData = async () => {
      try {
          setIsLoading(true);
          const res = await fetch(hostUrl + 'journals/all');
          if (res.ok) {
              const result = await res.json();
              setSectionsDataSource(SectionsData);
              // setSectionsDataSource(result.data);
              console.log(sectionsDataSource, 'found')
          }
      } catch (err) {
          console.error('Error fetching data:', err?.message);
      } finally {
          setIsLoading(false);
      }
  }

  useEffect(() => {
      fetchInitData();
      fetchData();
  }, []);

  return (
    <div>
      <div>
        <h1 className='font-bold text-2xl'>Settings</h1>
      </div>
        
        <div className="mt-8">

          <div className="py-2 mb-5 rounded-lg">
            <div className="relative w-full py-4 shadow-box">
              <Tabs position="relative" variant="unstyled" isLazy>
                <TabList className="whitespace-nowrap gap-3 text-sm">
                  <Tab
                    onClick={fetchData}
                    className=" border-[#3B3939] text-[#313131] "
                    _hover={{ color: "#FFFFFF", backgroundColor:"#313131",  borderTop:"1px", borderTopColor: "#FFF" }}
                    _selected={{ color: "#313131", backgroundColor:"#FFFFFF", borderTop:"1px", borderTopColor: "#0F1B2D"}}
                  >
                    <span className="py-2 min-w-[150px]">
                      Journals
                    </span>
                  </Tab>
                  <Tab 
                    onClick={fetchSectionsData}
                    className=" border-[#3B3939] text-[#313131]"
                    _hover={{ color: "#FFFFFF", backgroundColor:"#313131",  borderTop:"1px", borderTopColor: "#FFF" }}
                    _selected={{ color: "#313131", backgroundColor:"#FFFFFF", borderTop:"1px", borderTopColor: "#0F1B2D"}}
                  >
                    
                    <span className="py-2  min-w-[150px]">
                      Sections
                    </span>
                  </Tab>
                  {/* <Tab 
                    className=" border-[#3B3939] text-[#313131]"
                    _hover={{ color: "#FFFFFF", backgroundColor:"#313131",  borderTop:"1px", borderTopColor: "#FFF" }}
                    _selected={{ color: "#313131", backgroundColor:"#FFFFFF", borderTop:"1px", borderTopColor: "#0F1B2D"}}
                  >
                    <span className="py-2  min-w-[150px]">
                      Categories
                    </span>
                  </Tab> */}
                </TabList>
                <TabPanels>
                  <TabPanel className="px-0 py-0">
                    <div>
                      <div className="bg-white min-h-[500px] p-4">
                        <JournalsMainTable 
                          user={user} 
                          users={users} 
                          data={dataSource} 
                          fetchData={fetchData} 
                          isLoading={isLoading}
                        />
                      </div>
                    </div>
                  </TabPanel>
                   <TabPanel className="px-0 py-0">
                    <div>
                      <div className="bg-white min-h-[500px] p-4">
                        <SectionsTable 
                          user={user} 
                          users={users} 
                          data={sectionsDataSource} 
                          fetchData={fetchSectionsData} 
                          isLoading={isLoading}
                        />
                      </div>
                    </div>
                  </TabPanel>
                  {/* <TabPanel className="px-0 py-0">
                    <div>
                      <div className="bg-white min-h-[500px] p-4">
                        <SectionsTable 
                          user={user} 
                          users={users} 
                          data={sectionsDataSource} 
                          fetchData={fetchSectionsData} 
                          isLoading={isLoading}
                        />
                      </div>
                    </div>
                  </TabPanel> */}
                </TabPanels>
              </Tabs>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Settings;
