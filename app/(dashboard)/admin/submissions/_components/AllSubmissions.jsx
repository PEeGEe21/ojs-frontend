'use client';

import EmptyState from "../../../../components/EmptyState";
import { LoaderIcon } from "../../../../components/IconComponent";
import CollectionList from "../../../../components/List/CollectionList";
import MainSubmissionsTable from "../../../../components/Tables/MainSubmissionsTable";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { allSubmissions } from "../../../../lib/constants";
import { JournalContext } from "../../../../utils/journalContext";
import { hostUrl } from "../../../../lib/utilFunctions";

const AllSubmissions = ({ searchQuery }) => {
  const { journals, selectedJournal, handleJournalChange, isLoading } = useContext(JournalContext);
  // const [searchQuery, setSearchQuery] = useState("");
  const [allSubmissions, setSubmissions] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setIsLoading] = useState(true);
  // const [allLaunches, setAllLaunches] = useState([]);




  useEffect(()=>{
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
      getUser()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (user && selectedJournal) {
        try {
          setIsLoading(true);
          const res = await fetch(hostUrl + 'submissions/admin/all');
          if (res.ok) {
            const result = await res.json();
            setSubmissions(result.data);
          }
        } catch (err) {
          console.error('Error fetching data:', err?.message);
        } finally {
          setIsLoading(false);
        }
      }
    };
  
    fetchData();
  }, [user, selectedJournal]);
  
  // useEffect(() => {
  //   setAllLaunches(allSubmissions);
  //   setTimeout(() =>{
  //     setIsLoading(false);
  //   },1000)
  // }, []);


  const filteredAllSubmissions = useMemo(() => {
    if (searchQuery && allSubmissions?.length > 0) {
      const filtered = allSubmissions.filter((submission) =>
        submission?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      return filtered;
    }
    return allSubmissions;
  }, [searchQuery, allSubmissions]);

  return (
    <div className="py-3">
      {loading ? (
        <div className="flex items-center justify-center h-full mt-4">
          <LoaderIcon extraClass={"text-[#0F1B2D] size-12"} className="text-[#0F1B2D] animate-spin" />
        </div>
      ) : filteredAllSubmissions?.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* {viewType === 0 ? (
            <CollectionGrid data={filteredAllLaunches} />
          ) : ( */}
            <MainSubmissionsTable submissions={filteredAllSubmissions} setSubmissions={setSubmissions}/>
          {/* )} */}
        </>
      )}
    </div>
  );
};

export default AllSubmissions;
