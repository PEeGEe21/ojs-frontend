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
import { formatMomentDate, hostUrl } from "../../lib/utilFunctions";
import axios from "axios";

const MySubmissions = ({submissions, setSubmissions}) => {
    // const [submissions, setSubmissions] = useState([]);
    // const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


      const deleteSubmission = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete?',
            text: 'You are about to delete a submission!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            allowOutsideClick: () => !Swal.isLoading(), // Prevent clicking outside modal during loading
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const response = await axios.delete(hostUrl + `submissions/delete/${id}`);
                    if (response.success){
                        Swal.fire(
                            'Deleted!',
                            'The Submission has been deleted.',
                            'success'
                        );
                    } else {
                        Swal.fire('Error!', 'There was an issue deleting your Submission.', 'error');
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire('Error!', 'There was an issue deleting your Submission.', 'error');
                    throw err; 
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setSubmissions((prevSubmissions) => prevSubmissions.filter((submission) => submission.id !== id));
                Swal.fire(
                    'Deleted!',
                    'The Submission has been deleted.',
                    'success'
                );
            }
        });
    };

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
                    <Th width={10}>#</Th>
                    <Th width={'70%'}>Article</Th>
                    <Th>Date Created</Th>
                    <Th>Action</Th>
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
                                <Td className="px-2 py-4 text-base whitespace-nowrap">
                                    <span className="text-[#313131] text-base">
                                        {index + 1}
                                    </span>
                                </Td>
                                <Td className="px-2 py-4 whitespace-nowrap">
                                    <div className='flex items-start justify-between text-sm'>
                                        <p>
                                            {item.title}
                                        </p>
                                    </div>
                                </Td>
                                <Td className="px-2 py-4 whitespace-nowrap">
                                    <div className='flex items-start justify-between text-sm'>
                                        <p>
                                            {formatMomentDate(item?.createdAt, false)}
                                        </p>
                                    </div>
                                </Td>
                                
                                <Td className="px-2 py-4 text-sm whitespace-nowrap">
                                    <div className="text-[#313131] text-xs flex items-center justify-center gap-2 flex-row">
                                        {/* && status === 'In Progress'  */}
                                        <Link href={'submissions/'+item.id} className='btn p-2 bg-[#e1e5ec] border border-[#e1e5ec] rounded text-[#666] flex items-center'>
                                            <Eye size={12}/>
                                        </Link>
                                        <button onClick={()=>deleteSubmission(item.id)} className='btn p-2 btn-red btn border border-[#e1e5ec] rounded !text-[#fff] flex items-center'>
                                            <Trash size={12}/>
                                        </button>
                                    </div>
                                </Td>

                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </div>
    </>
  )
}

export default MySubmissions
