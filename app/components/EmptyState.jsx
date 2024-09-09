'use client';
import Image from 'next/image';
import React from 'react';

const EmptyState = ({title = 'No data found'}) => {
  return (
    <div className="flex items-center h-full w-full justify-center py-12 text-center">
      <div>
        <Image
          src="/images/empty.svg"
          alt="empty"
          width={150}
          height={150}
          className="object-contain"
        />
        <p className="text-sm text-[#313131] mt-5">{title}</p>
      </div>
    </div>
  );
};

export default EmptyState;
