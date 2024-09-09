import React from "react";
import CollectionItem from "./CollectionItem";

const CollectionList = ({ data }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 mb-3 py-4 px-4">
        {data.map((item) => (
          <CollectionItem key={item?._id} data={item} />
        ))}
      </div>
    </>
  );
};

export default CollectionList;