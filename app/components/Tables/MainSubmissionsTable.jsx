"use client";
import React, { use, useEffect, useRef, useState,useMemo } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { LoaderIcon } from "../IconComponent";
import { Eye, Trash } from "iconsax-react";
import { demoSubmissions } from "../../lib/constants";
import Link from "next/link";
import Swal from 'sweetalert2';
import { hostUrl } from "../../lib/utilFunctions";
import axios from "axios";
import CollectionItem from "../List/CollectionItem";

const MainSubmissionsTable = ({submissions, setSubmissions}) => {
    // const [submissions, setSubmissions] = useState([]);
    // const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);




    // useEffect(() => {
    //     fetchUploads();
    // }, []);

    // useMemo(() => {
    //     if (isLoading) {
    //         return (
    //             <div className="text-center">
    //                 <LoaderIcon />
    //             </div>
    //         );
    //     }
    // }, [isLoading]);
  return (
    <>
        <div className="overflow-x-auto md:overflow-x-auto p-4 text-[#313131] scrollbar-change rounded-md">
            <Table variant='unstyled' className=' table-bordered'>
                <Thead className='bg-[#F7FAFC] border-b border-[#e7ecf1]'>
                <Tr>
                    {/* <Th width={10}>#</Th> */}
                    <Th>Article</Th>
                    {/* <Th>Date Created</Th> */}
                    {/* <Th>Action</Th> */}
                </Tr>
                </Thead>
                <Tbody className=' w-full px-4 divide-y divide-[#e7ecf1]'>

                    {submissions?.length < 1 &&
                        <Tr>
                            <Td colSpan={8} className="px-2 py-4 text-base whitespace-nowrap text-center">
                                <span className="text-[#313131] text-base">
                                    No data found
                                </span>
                            </Td>
                        </Tr>
                    }

                    {submissions?.length > 0 && submissions?.map((item, index) => {

                        return (
                            <Tr key={index} className='px-4 hover:bg-[#F7FAFC]'>
                                {/* <Td className="px-2 py-4 text-base whitespace-nowrap">
                                    <span className="text-[#313131] text-base">
                                        {index + 1}
                                    </span>
                                </Td> */}
                                <Td className="px-2 py-4 whitespace-nowrap">
                                    <CollectionItem index={index + 1} data={item} setSubmissions={setSubmissions}/>
                                    {/* <div className='flex items-start justify-between text-sm'>
                                        <p>
                                            {item.title}
                                        </p>
                                    </div> */}
                                </Td>
                                {/* <Td className="px-2 py-4 whitespace-nowrap">
                                    <div className='flex items-start justify-between text-sm'>
                                        <p>
                                            {item.createdAt}
                                        </p>
                                    </div>
                                </Td> */}
                                                                        {/* && status === 'In Progress'  */}

                                {/* <Td className="px-2 py-4 text-sm whitespace-nowrap">
                                    <div className="text-[#313131] text-xs flex items-center justify-center gap-2 flex-row">
                                        <Link href={'submissions/'+item.id} className='btn p-2 bg-[#e1e5ec] border border-[#e1e5ec] rounded text-[#666] flex items-center'>
                                            <Eye size={12}/>
                                        </Link>
                                        <button onClick={()=>deleteSubmission(item.id)} className='btn p-2 bg-[#e1e5ec] border border-[#e1e5ec] rounded text-[#666] flex items-center'>
                                            <Trash size={12}/>
                                        </button>
                                    </div>
                                </Td> */}

                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </div>
    </>
  )
}

export default MainSubmissionsTable
