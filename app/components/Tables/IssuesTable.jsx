'use client'

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDisclosure } from '@chakra-ui/react';
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
import Link from 'next/link';
import { LoaderIcon, LoaderIcon2 } from '../IconComponent';
import { issuesData, successOptions } from '../../lib/constants';
import { Edit, PenTool, PenTool2, Trash } from 'iconsax-react';
import toast from 'react-hot-toast';
import AddIssueModal from '../Modals/issues/AddIssueModal';
import EditIssueModal from '../Modals/issues/EditIssueModal';
import { getRandomRoles } from '../../utils/common';
import { hostUrl } from '../../lib/utilFunctions';
import axios from 'axios';

const IssuesTable = () => {
    const [dataSource, setDataSource] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState(dataSource);
    const [editingKey, setEditingKey] = useState('');
    const [currentIssue, setCurrentIssue] = useState({});
    const [isEditingUser, setIsEditingUser] = useState(false);
    const [user, setUser] = useState(null);
    const [statusState, setStatusState] = useState('');
    const [isSavingStatus, setIsSavingStatus] = useState({});
    const [roles, setRoles] = useState([]);
    const {
        isOpen: issueEditIsOpen,
        onOpen: onIssueEditOpen,
        onClose: onIssueEditClose,
    } = useDisclosure();

    const {
        isOpen: issueAddIsOpen,
        onOpen: onIssueAddOpen,
        onClose: onIssueAddClose,
    } = useDisclosure();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(hostUrl + 'issues');
            if (res.ok) {
                const result = await res.json();
                // setDataSource(issuesData);
                setDataSource(result.issues);
                setRoles(result.roles);
            }
        } catch (err) {
            console.error('Error fetching data:', err?.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const isEditing = (record) => record.key === editingKey;


    const cancel = (page) => {
        setEditingKey('');
        setCurrentPage(page);
    };

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
            editable: true,
        },
        {
            key: '2',
            title: 'Volume',
            dataIndex: 'volume',
            editable: true,
        },
        {
            key: '3',
            title: 'Number',
            dataIndex: 'number',
            editable: true,
            render: (text) => <a>{text}</a>,
        },
        {
            key: '4',
            title: 'Year',
            dataIndex: 'year',
            editable: true,
        },
        {
            title: 'Action',
            key: '5',
            render: (_, record) => {
                return (
                        <Space size="middle">
                            <button 
                                className="flex btn btn-info items-center gap-1 text-xs" 
                                onClick={() => {
                                    // setIsEditingUser(true);
                                    setCurrentIssue(record);
                                    onIssueEditOpen();
                                  }}
                            >
                                <Edit size={14}/>Edit
                            </button>
                            
                            <button 
                                className='flex btn btn-red items-center gap-1 text-xs' 
                                onClick={(e)=>deleteIssue(record)}>
                                    <Trash size={12}/> Delete
                            </button>
                        </Space>
                    )
            
            },
        },
    ];

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        fetchData();

        setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
        }, 1000);
    };

    const hasSelected = selectedRowKeys.length > 0;

    const deleteIssue = (data) => {
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
                  const response = await axios.delete(hostUrl + 'issues/delete/'+ parseInt(data.id));
                  if(response.data.success) {
                    const newData = dataSource.filter((item) => item.id !== data.id);
                    setDataSource(newData);
                    Swal.fire(
                      'Deleted!',
                      'The Issue has been deleted.',
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
            
            // if (result.isConfirmed) {
            //     Swal.fire(
            //     'Deleted!',
            //     'The Role has been deleted.',
            //     'success'
            //     );
            // }
        });
    };

    return (
        <>
            {isLoading ? 
            (
                <div className='h-full flex items-center justify-center'>
                    <LoaderIcon
                        extraClass="text-[#034343] h-6 w-8"
                        className="animate-spin"
                    />
                </div>
            ) :(
                <Form form={form} component={false}>
                    <Flex gap="middle" vertical>
                        <Flex align="center" gap="middle" justify='end'>
                            <Flex align="center" gap="middle">

                                <Button type="primary" onClick={start} loading={loading}>
                                    Reload
                                </Button>
                                {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
                            </Flex>
                            <Button className='text-[#008000]' 
                                onClick={() => {
                                    setCurrentIssue(null);
                                    onIssueAddOpen();
                                }}
                                >
                                Add Issue
                            </Button>
                        </Flex>
                        <Table 
                            scroll={{ x: 'max-content' }}
                            // rowSelection={rowSelection} 
                            columns={columns} 
                            dataSource={dataSource} 
                            components={{
                                body: {
                                        // cell: EditableCell,
                                    },
                                }}
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
                </Form>
            )}

            {/* {currentIssue ? ( */}
            <AddIssueModal
                user={user}
                isOpen={issueAddIsOpen}
                onClose={onIssueAddClose}
                dataSource={dataSource}
                setDataSource={setDataSource}
                start={start}
                roles={roles}
            />
            {/* ) : (
                ' '
            )} */}
            
            {currentIssue ? (
                <EditIssueModal
                    user={user}
                    isOpen={issueEditIsOpen}
                    onClose={onIssueEditClose}
                    dataSource={dataSource}
                    currentIssue={currentIssue}
                    setDataSource={setDataSource}
                    setCurrentIssue={setCurrentIssue}
                    // isEditing={isEditingUser}
                    // setIsEditingUser={setIsEditingUser}
                    start={start}
                    roles={roles}
                />
             ) : (
                ' '
            )}
        </>
    );
};
export default IssuesTable;