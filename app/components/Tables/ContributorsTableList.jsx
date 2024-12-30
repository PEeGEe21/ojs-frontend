import React from 'react'
import { Box, Progress, Tab, TabIndicator, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast, Tooltip } from "@chakra-ui/react";
import { getContributorRole, getFullName } from '../../utils/common';
import { Checkmark, Close } from '@carbon/icons-react';
import Swal from 'sweetalert2';
import axios from "axios";
import { hostUrl } from '../../lib/utilFunctions';
const ContributorsTableList = ({contributors = [], fetchData, onAddContributorOpen, onUpdateContributorOpen, setCurrentContributor}) => {
    const handleOpenCurrentContributor = (contributor) =>{
        setCurrentContributor(contributor)
        onUpdateContributorOpen();
    }

    const deleteContributor = (contributor) => {
        Swal.fire({
            title: 'Are you sure you want to delete this contributor?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            allowOutsideClick: () => !Swal.isLoading(), // Prevent clicking outside modal during loading
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const response = await axios.delete(hostUrl + `submissions/contributor/delete/${parseInt(contributor?.id)}`);
                    if (response.data.success){
                        Swal.fire(
                            'Deleted!',
                            response?.data?.message,
                            'success'
                        );
                        fetchData()

                    } else {
                        Swal.fire('Error!', 'There was an issue deleting Contributor.', 'error');
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire('Error!', 'There was an issue deleting Contributor.', 'error');
                    throw err; 
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                fetchData()
            }
        });
    };

    return (
        <>
            <div>
                <div className="flex items-center justify-between gap-2">

                    <h3 className="font-medium text-[#212121] text-base">
                        Contributors
                    </h3>
                    <button 
                        onClick={onAddContributorOpen}
                        className="w-auto whitespace-nowrap py-2 md:py-2 px-3 md:px-3 bg-[#313131] text-white transition ease-in duration-200 text-center font-semibold shadow-md rounded flex items-center justify-center gap-2 text-xs"
                    >
                        <p className="">Add Contributor</p>
                    </button>
                </div>
                <div>
                    <div className="overflow-x-auto md:overflow-x-auto py-4 text-[#313131] scrollbar-change rounded-md">
                        <Table variant='unstyled' className=' table-bordered'>
                            <Thead className='bg-[#F7FAFC] border-b border-[#e7ecf1]'>
                            <Tr>
                                <Th className="px-2" width={10}>#</Th>
                                <Th className="px-2" width={40}>Name</Th>
                                <Th className="px-2" width={20}>E-mail</Th>
                                <Th className="px-2" width={20}>Role</Th>
                                <Th className="px-2" width={10}>Primary Contact</Th>
                                <Th className="px-2" width={10}>&nbsp;</Th>
                            </Tr>
                            </Thead>
                            <Tbody className=' w-full px-4 divide-y divide-[#e7ecf1]'>

                                {contributors?.length < 1 &&
                                    <Tr>
                                        <Td colSpan={8} className="px-2 py-4 text-base whitespace-nowrap text-center">
                                            <span className="text-[#313131] text-base">
                                                No data found
                                            </span>
                                        </Td>
                                    </Tr>
                                }

                                {contributors?.length > 0 && contributors?.map((contributor, index) => {

                                    return (
                                        <Tr key={index} className='px-4 hover:bg-[#F7FAFC]'>
                                            <Td className="px-2 py-4 whitespace-nowrap">
                                                <span className="text-[#313131] text-sm">
                                                    {index + 1}
                                                </span>
                                            </Td>
                                            <Td className="px-2 py-4 whitespace-nowrap">
                                                <div className='flex items-start justify-between text-sm'>
                                                    <p className='capitalize'>
                                                        {contributor?.public_name??''} {getFullName(contributor)}
                                                    </p>
                                                </div>
                                            </Td>
                                            <Td className="px-2 py-4 whitespace-nowrap">
                                                <div className='flex items-start justify-between text-sm'>
                                                    <p>
                                                        {contributor?.email}
                                                    </p>
                                                </div>
                                            </Td>

                                            <Td className="px-2 py-4 whitespace-nowrap">
                                                <div className='flex items-start justify-between text-sm'>
                                                    <p>
                                                        {getContributorRole(contributor?.role)}
                                                    </p>
                                                </div>
                                            </Td>

                                            <Td className="px-2 py-4 whitespace-nowrap">
                                                <div className='flex items-start justify-between text-sm'>
                                                    <p>
                                                        {contributor?.is_principal_contact == 1 ?
                                                                <Checkmark className="btn-success"/>
                                                            : 
                                                                <Close className="btn-danger"/> 
                                                        }
                                                    </p>
                                                </div>
                                            </Td>
                                            <Td className="px-2 py-4 whitespace-nowrap">
                                                <div className='flex items-start gap-1 text-sm'>
                                                    <button 
                                                        className="btn-primary p-1 text-xs" 
                                                        onClick={()=>handleOpenCurrentContributor(contributor)}>
                                                        Edit
                                                    </button>

                                                    <button 
                                                        onClick={()=>deleteContributor(contributor)} 
                                                        className="btn-danger p-1 text-xs">
                                                        Delete
                                                    </button>
                                                </div>
                                            </Td>
                                            
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </div>
                </div>
            </div>
        
        </>
    )
}

export default ContributorsTableList
