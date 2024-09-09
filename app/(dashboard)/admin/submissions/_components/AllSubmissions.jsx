import EmptyState from "../../../../components/EmptyState";
import { LoaderIcon } from "../../../../components/IconComponent";
import CollectionList from "../../../../components/List/CollectionList";
import React, { useEffect, useMemo, useState } from "react";
import { allSubmissions } from "../../../../lib/constants";

const AllSubmissions = ({ searchQuery }) => {
  const [loading, setLoading] = useState(true);
  const [allLaunches, setAllLaunches] = useState([]);

  useEffect(() => {
    setAllLaunches(allSubmissions);
    setTimeout(() =>{
      setLoading(false);
    },1000)
  }, []);

  // useEffect(() => {
  //   const getLaunches = async () => {
  //     try {
  //       const response = await fetch("/api/launch");
  //       if (response.ok) {
  //         const data = await response.json();
  //         setAllLaunches(data?.launches);
  //       }
  //     } catch (error) {
  //       console.error("failed to fetch launches", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getLaunches();
  // }, []);

  const filteredAllLaunches = useMemo(() => {
    if (searchQuery && allLaunches?.length > 0) {
      const filtered = allLaunches.filter((launch) =>
        launch?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      return filtered;
    }
    return allLaunches;
  }, [searchQuery, allLaunches]);

  return (
    <div className="py-3">
      {loading ? (
        <div className="flex items-center justify-center h-full mt-4">
          <LoaderIcon extraClass={"text-[#0F1B2D] size-12"} className="text-[#0F1B2D] animate-spin" />
        </div>
      ) : filteredAllLaunches?.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* {viewType === 0 ? (
            <CollectionGrid data={filteredAllLaunches} />
          ) : ( */}
            <CollectionList data={filteredAllLaunches} />
          {/* )} */}
        </>
      )}
    </div>
  );
};

export default AllSubmissions;
