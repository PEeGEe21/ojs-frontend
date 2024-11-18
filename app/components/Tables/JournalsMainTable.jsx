'use client'

import React, { useEffect, useState } from 'react';
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
import AddJournalModal from '../Modals/journals/AddJournalModal';
import EditJournalModal from '../Modals/journals/EditJournalModal';
import { Edit, Trash } from 'iconsax-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { hostUrl, shortenTitle } from '../../lib/utilFunctions';

  
const JournalsMainTable = ({user, users, data, fetchData, isLoading}) => {
    console.log(user, users, data, isLoading)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [statusState, setStatusState] = useState('');
    const [currentJournal, setCurrentJournal] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isSavingStatus, setIsSavingStatus] = useState({});
    const {
        isOpen: journalIsOpen,
        onOpen: onJournalOpen,
        onClose: onJournalClose,
    } = useDisclosure();
    const {
        isOpen: journalEditIsOpen,
        onOpen: onJournalEditOpen,
        onClose: onJournalEditClose,
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
            title: 'Journal Name',
            dataIndex: 'name',
            width: 50,
            render: (text) => <a className='whitespace-nowrap'>{text}</a>,
        },
        {
            key: '2',
            title: 'Note',
            dataIndex: 'note',
            render: (text) => <div dangerouslySetInnerHTML={{
                __html: text,
            }}
            ></div>,
        },
        {
            key: '3',
            title: 'Status',
            dataIndex: 'status',
            editable: false,
            render: (text, record, index) => (
                <Space size="middle">
                    <button
                        className={`btn btn-sm flex items-center gap-2 ${record.status ? 'btn-success' : 'btn-danger'}`}
                        disabled={isSavingStatus[record.id]}
                        aria-disabled={isSavingStatus[record.id]}
                        onClick={
                            // setIsSavingStatus(true);
                            // setCurrentUser(record);
                            ()=>toggleCurrentJournalStatus(text, record, index, record.status)
                          }
                          >
                            {isSavingStatus[record.id] ? (
                                <>
                                    <LoaderIcon
                                        extraClass="text-white h-5 w-5"
                                        className="animate-spin"
                                    />
                                </>
                            ) : (
                                record.status ? 'Active' : 'Inactive'
                            )}
                            
                    </button>
                </Space>
            ),
        },
        {
            title: 'Action',
            key: '4',
            width: 50,
            render: (_, record) => (
            <Space size="middle">
                <button 
                    className="flex btn btn-info items-center gap-1 text-xs" 
                    onClick={() => {
                        setCurrentJournal(record);
                        onJournalEditOpen();
                      }}>
                    <Edit size={14}/> Edit
                </button>
                {/* <button 
                    className="flex btn btn-red items-center gap-1 text-xs" 
                    onClick={(e)=>deleteJournal(record)}>
                        <Trash size={12}/> Delete
                </button> */}
            </Space>
            ),
        },
    ];
    
    const toggleCurrentJournalStatus = async(text, record, index, status) => {
        let key = record.id
        var msg = '';
        if (key == "undefined") {
            msg = "Record key is not defined:";
            console.error(msg);
            toast.error(msg, {
                position: "top-right"
            });
            return;
        }

        setCurrentJournal(record);
        setStatusState(key);
        
        
        if(currentJournal){
            
            setIsSavingStatus({
                [key]: true
            });
            try {
                    
                const updatedRecord = { ...record, status: record.status ? 0 : 1 };
                const updatedDataSource = dataSource.map(item => 
                    item.id === record.id ? updatedRecord : item
                );
        
                await axios.post(hostUrl + `journals/update-active-status/`+record?.id);

                setDataSource(updatedDataSource);
        
                setTimeout(() => {
                    setIsSavingStatus({
                        [key]: false
                    });

                    msg = 'Successfully '+ (updatedRecord.status ? 'Activated' : 'Deactivated')  + '!!'
                    toast.success(msg, {
                        successOptions,
                        position: "top-right"
                    });
                    setIsSavingStatus({});
                }, 500);
        
            } catch (err) {
                setIsSavingStatus({
                    [key]: false
                });
                setIsSavingStatus({});
                toast.error(err.message);
            }
        }
    };

    const start = () => {
        // setLoading(true);
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

    const deleteJournal = (data) => {
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
                    const response = await axios.delete(hostUrl + 'journals/delete/'+ parseInt(data.id));
                    if(response.data.success) {
                        const newData = dataSource.filter((item) => item.id !== data.id);
                        setDataSource(newData);
                        Swal.fire(
                            'Deleted!',
                            'The Journal has been deleted.',
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
                        <Button type="default" onClick={onJournalOpen}>
                            Add Journal
                        </Button>
                    </Flex>
                    <Table 
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

        <AddJournalModal
            isOpen={journalIsOpen}
            onClose={onJournalClose}
            dataSource={dataSource}
            start={start}
            users={users}
            loggedInUser={user}
        />


        {currentJournal ? (
            <EditJournalModal
                user={user}
                isOpen={journalEditIsOpen}
                onClose={onJournalEditClose}
                dataSource={dataSource}
                currentJournal={currentJournal}
                setDataSource={setDataSource}
                setCurrentJournal={setCurrentJournal}
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

export default JournalsMainTable
