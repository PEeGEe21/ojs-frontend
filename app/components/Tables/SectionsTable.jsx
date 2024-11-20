'use client'

import React, { useContext, useEffect, useState } from 'react';
import { LoaderIcon, LoaderIcon2 } from '../IconComponent';
import Swal from 'sweetalert2';
import { useDisclosure } from '@chakra-ui/react';
import {successOptions} from '../../lib/constants';
import Link from 'next/link';
import { 
    Form, 
    Button, 
    Flex, 
    Table, 
    Tag, 
    Space, 
    InputNumber, 
    Input, 
    Typography, 
    Popconfirm ,
    Spin
} from 'antd';
import AddSectionModal from '../Modals/sections/AddSectionModal';
import EditSectionModal from '../Modals/sections/EditSectionModal';
import { Edit, Trash } from 'iconsax-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { hostUrl, shortenTitle } from '../../lib/utilFunctions';
import { JournalContext } from '../../utils/journalContext';

  
const SectionsTable = ({user, users, data, fetchData, isLoading}) => {
    const { selectedJournal } = useContext(JournalContext);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [statusState, setStatusState] = useState('');
    const [currentSection, setCurrentSection] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const {
        isOpen: sectionIsOpen,
        onOpen: onSectionOpen,
        onClose: onSectionClose,
    } = useDisclosure();
    const {
        isOpen: sectionEditIsOpen,
        onOpen: onSectionEditOpen,
        onClose: onSectionEditClose,
    } = useDisclosure();
    const pageSize = 10; 

    console.log(dataSource, 'dataSource')

    useEffect(()=>{
        setDataSource(data)
    }, [data])

    // const user = null;

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key:'index',
            render: (text, record, index) => (
                <a>{(currentPage - 1) * pageSize + index + 1}</a>
            ),
        },
        {
            key: '1',
            title: 'Title',
            dataIndex: 'title',
            // width: 50,
            render: (text) => <a className='whitespace-nowrap'>{text}</a>,
        },
        {
            key: '2',
            title: 'Abbreviation',
            dataIndex: 'abbreviation',
            // width: 50,
            render: (text) => <a>{text}</a>,
        },
        // {
        //     key: '3',
        //     title: 'Editors',
        //     dataIndex: 'editors',
        //     // width: 50,
        //     render: (text) => <a>{text}</a>,
        // },
        {
            title: 'Action',
            key: '3',
            width: 50,
            render: (_, record) => (
                <div className=''>

                <Space size="middle">
                    <button 
                        className="flex btn btn-info items-center gap-1 text-xs" 
                        onClick={() => {
                            setCurrentSection(record);
                            onSectionEditOpen();
                        }}>
                        <Edit size={14}/>
                    </button>
                    <button 
                        className="flex btn btn-red items-center gap-1 text-xs" 
                        onClick={(e)=>deleteSection(record)}>
                            <Trash size={14}/>
                    </button>
                </Space>
            </div>

            ),
        },
    ];

    const start = () => {
        setLoading(true);
        fetchData();
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const cancel = (page) => {
        setEditingKey('');
        setCurrentPage(page);
    };

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const deleteSection = (data) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            allowOutsideClick: () => !Swal.isLoading(), // Prevent clicking outside modal during loading
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const response = await axios.delete(hostUrl + 'journals/sections/delete/'+ parseInt(data.id));
                    if(response.data.success) {
                        const newData = dataSource.filter((item) => item.id !== data.id);
                        setDataSource(newData);
                        Swal.fire(
                            'Deleted!',
                            'The Section has been deleted.',
                            'success'
                        );
                    } else{
                        Swal.fire(
                            'Error',
                            'Delete Failed!',
                            'error'
                        );
                    }
                } catch (error) {
                    toast.error('An error occurred while deleting')
                }
            },
        }).then((result) => {
            
        });
    };
      
    return (
        <>
            {isLoading && !user ? 
            (
                <div className='h-full flex items-center justify-center'>
                    <LoaderIcon2
                        extraClass="text-[#034343] h-6 w-8"
                        className="animate-spin"
                    />
                </div>
            ) :(
                <Flex gap="middle" vertical>
                    <Flex align="center" gap="middle" justify='end'>
                        <Flex align="center" gap="middle">

                            
                        </Flex>
                        <Button type="primary" onClick={start} loading={loading}>
                            Reload
                        </Button>
                        <Button type="default" onClick={onSectionOpen}>
                            Add Section
                        </Button>
                    </Flex>
                    <Table 
                        scroll={{ x: 'max-content' }}
                        // rowSelection={rowSelection} 
                        columns={columns} 
                        dataSource={dataSource}
                        bordered
                        rowClassName="editable-row"
                        pagination={{
                            // pageSize: 50,
                            onChange: (page)=>cancel(page),
                            pageSize: pageSize,
                        }}
                        rowKey="id"
                    />
                </Flex>
            )}

        <AddSectionModal
            isOpen={sectionIsOpen}
            onClose={onSectionClose}
            dataSource={dataSource}
            start={start}
            users={users}
            loggedInUser={user}
        />


        {currentSection ? (
            <EditSectionModal
                user={user}
                isOpen={sectionEditIsOpen}
                onClose={onSectionEditClose}
                dataSource={dataSource}
                currentSection={currentSection}
                setDataSource={setDataSource}
                setCurrentSection={setCurrentSection}
                start={start}
                users={users}
                loggedInUser={user}
            />
        ) : (
            ' '
        )}
        </>
    )
}

export default SectionsTable
