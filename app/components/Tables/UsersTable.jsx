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
import {LoaderIcon, LoaderIcon2} from '../IconComponent';
import {successOptions} from '../../lib/constants';
import { Edit, PenTool, PenTool2, Trash } from 'iconsax-react';
import toast from 'react-hot-toast';
import EditUserModal from '../Modals/user/EditUserModal';
import { getRandomRoles, logout } from '../../utils/common';
import { hostUrl } from '../../lib/utilFunctions';
import axios from 'axios';
import { Recycle } from '@carbon/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps} key={index}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };



const dataSourceData = Array.from({
  length: 100,
}).map((_, i) => ({
    key: i,
    id: i,
    fname: `Edward ${i}`,
    lname: `King ${i}`,
    username: `testuser${i}`,
    email: `mail${i}@gmail.com`,
    status: Math.random() < 0.5 ? 1 : 0,
    roles: getRandomRoles(),
    //   description: `testtttt ${i++}`,
    //   tags: ['loser'],
}));

const UsersTable = () => {
    const [dataSource, setDataSource] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState(dataSource);
    const [editingKey, setEditingKey] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const [isEditingUser, setIsEditingUser] = useState(false);
    const [user, setUser] = useState(null);
    const [statusState, setStatusState] = useState('');
    const [isSavingStatus, setIsSavingStatus] = useState({});
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);
    const [errMessage, setErrMessage] = useState(null);
    const {
        isOpen: userEditIsOpen,
        onOpen: onUserEditOpen,
        onClose: onUserEditClose,
    } = useDisclosure();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Update with your actual page size
    const router = useRouter();
    const { push } = useRouter();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(hostUrl + 'users');
            if (res.ok) {
            const result = await res.json();
            setDataSource(result.users);
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
    const edit = (record) => {
        form.setFieldsValue({
            fname: '',
            lname: '',
            username: '',
            email: '',
        ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = (page) => {
        setEditingKey('');
        setCurrentPage(page);
    };

    const loginAsUser = (user) => {
        logout();
        router.push('/auth/login');
        toast.success('Successfully logged out')
        setTimeout(()=>{
            loginUser(user);
        }, 300)
    }

    const loginUser = async (user) => {
        setLoading(true);
    
        axios
          .post(`${hostUrl}auth/login-in-as`, {
            email: user.email,
          })
          .then((res) => {
            if (res.data.success) {
              // toast.success(res.data.message, 'success');
              let token = res?.data?.access_token;
              let user = res?.data?.user;
              // const role = res?.data?.user?.role;
              localStorage.setItem('accessOJSUserToken', token);
              localStorage.setItem('ojs-user', JSON.stringify(user));
            //   setAuthToken(token);
              setTimeout(() => {
                if(user?.defaultRole?.id == 1) {
                    push(`/admin/submissions`);
                    toast.success(res.data.message);
                }
                if(user?.defaultRole?.id == 3) {
                    push(`/author/submissions`);
                    toast.success(res.data.message);
                }
              }, 300);
            } else {
              setError(true);
              let message = '';
              if (!res.data?.message) {
                message = 'An error occurred';
              } else {
                message = res.data?.message;
              }
              setErrMessage(message);
              // ToasterAlert(message, 'error');
              toast.error(message);
    
            }
    
            setLoading(false);
          })
          .catch((err) => {
            console.log('err', err);
            setError(true);
            setErrMessage(err?.response?.data?.message);
            toast.error(err?.response?.data?.message);
    
            // ToasterAlert(err?.response?.data?.message, 'error');
            setLoading(false);
    
            setTimeout(()=>{
              setError(false);
            }, 6000)
          });
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            // render: (text, record, index) => <a key={index}>{index + 1}</a>,
            // rowScope: 'row',
            key:'index',
            render: (text, record, index) => (
                <a>{(currentPage - 1) * pageSize + index + 1}</a>
            ),
        

        },
        {
            key: '1',
            title: 'Username',
            dataIndex: 'username',
            editable: true,
        },
        {
            key: '2',
            title: 'Email',
            dataIndex: 'email',
            editable: true,
        },
        {
            key: '3',
            title: 'First Name',
            dataIndex: 'firstname',
            editable: true,
            render: (text) => <a>{text}</a>,
        },
        {
            key: '4',
            title: 'Last Name',
            dataIndex: 'lastname',
            editable: true,
        },
        {
            key: '5',
            title: 'Roles',
            dataIndex: 'roles',
            editable: false,
            render: (text, record, index) => (

                <Space size="small">
                    {record?.roles.map((role, index, array) => (
                        <span key={index}>
                            {role?.role?.name}{index < array.length - 1 && ', '}
                        </span>
                    ))}
                </Space>
            ),
        },
        {
            key: '6',
            title: 'Status',
            dataIndex: 'status',
            editable: false,
            render: (text, record, index) => (
                <Space size="middle">
                    <button
                        className={`btn btn-sm flex items-center gap-2 ${record.is_active ? 'btn-success' : 'btn-danger'}`}
                        disabled={isSavingStatus[record.id]}
                        aria-disabled={isSavingStatus[record.id]}
                        onClick={
                            // setIsSavingStatus(true);
                            // setCurrentUser(record);
                            ()=>toggleCurrentPersonStatus(text, record, index, record.is_active)
                          }
                          >
                            {isSavingStatus[record.id] ? (
                                <>
                                    <LoaderIcon
                                        extraClass="text-white h-5 w-5"
                                        className="animate-spin mr-1"
                                    />
                                </>
                            ) : (
                                record.is_active ? 'Active' : 'Inactive'
                            )}
                    </button>
                </Space>
            ),
        },
        {
            title: 'Action',
            key: '7',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginInlineEnd: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                    ) : (
                        <Space size="middle">
                            <button 
                                className="flex btn btn-info items-center gap-1 text-xs" 
                                onClick={() => {
                                    setIsEditingUser(true);
                                    setCurrentUser(record);
                                    onUserEditOpen();
                                  }}
                            >
                                <Edit size={14}/>Edit
                            </button>
                            {/* <button className="flex btn btn-info items-center gap-1 text-xs" disabled={editingKey !== ''} onClick={() => edit(record)}>
                                <Edit size={14}/>Edit
                            </button> */}
                            <button className='flex btn btn-red items-center gap-1 text-xs  ' onClick={(e)=>deleteUser(record)}><Trash size={12}/> Delete</button>
                            <button className='flex btn btn-warning items-center gap-1 text-xs  ' onClick={(e)=>loginAsUser(record)}><Recycle size={12}/> Login As</button>
                        </Space>
                    )
            
            },
        },
    ];

    const save = async (key) => {
        try {
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
            ...item,
            ...row,
            });
            setData(newData);
            setEditingKey('');
        } else {
            newData.push(row);
            setData(newData);
            setEditingKey('');
        }
        } catch (errInfo) {
        }
    };

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
        return col;
        }
        return {
        ...col,
        onCell: (record) => ({
            record,
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
        }),
        };
    });

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        fetchData();

        setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    
    const hasSelected = selectedRowKeys.length > 0;

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         setDataSource(dataSourceData);
    //         setIsLoading(false);
    //     }, 100);
    // }, [])


    // const toggleCurrentPersonStatus = (data) => {
    //     console.log(data)
    //     data.status = data.status === 1 ? 0 : 1;
    // }

    const toggleCurrentPersonStatus = async(text, record, index, status) => {
        let key = record.id
        // key = "undefined";
        var msg = '';
        if (key == "undefined") {
            msg = "Record key is not defined:";
            console.error(msg);
            toast.error(msg, {
                position: "top-right"
            });
            return;
        }

        setCurrentUser(record);
        setStatusState(key);
        
        
        if(currentUser){
            
            setIsSavingStatus({
                [key]: true
            });
            try {
                    
                const updatedRecord = { ...record, is_active: record.is_active ? 0 : 1 };
                const updatedDataSource = dataSource.map(item => 
                    item.id === record.id ? updatedRecord : item
                );
        
                await axios.post(`${hostUrl}users/update-active-status/`+record?.id);

                setDataSource(updatedDataSource);
        
                setTimeout(() => {
                    setIsSavingStatus({
                        [key]: false
                    });

                    msg = 'Successfully '+ (updatedRecord.is_active ? 'Activated' : 'Deactivated')  + '!!'
                    toast.success(msg, {
                        successOptions,
                        position: "top-right"
                    });
                }, 500);

        
            //   const response = await updateTaskPriorityStatus(user.status, user.id);
        
            //   if (response.success) {
            //     user.status = response.data.status;
            //     const updatedStatus = null;
            //     // const updatedStatus = await getStatuses(currentUser?.id);
            //     setDataSource(updatedStatus);
                
            //   } else {
            //     toast.error(response.message);
            //   }
        
            } catch (err) {
                setIsSavingStatus({
                    [key]: false
                });
                toast.error(err.message);
            }
        }
    };

    useEffect(() => {
    }, [currentUser, isSavingStatus]);

    const deleteUser = (data) => {
        Swal.fire({
            title: 'You\'re currently deleting' + ' ' + data.email,
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
                  const response = await axios.delete(hostUrl + 'users/delete/'+ parseInt(data.id));
                  if(response.data.success) {
                    const newData = dataSource.filter((item) => item.id !== data.id);
                    setDataSource(newData);
                    Swal.fire(
                      'Deleted!',
                      'The User has been deleted.',
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
                                    setIsEditingUser(false);
                                    setCurrentUser(null);
                                    onUserEditOpen();
                                }}
                                >
                                Add User
                            </Button>
                            {/* <Link href={'/admin/users/roles'} className="btn-primary">
                                Roles
                            </Link> */}
                        </Flex>
                        <Table 
                            scroll={{ x: 'max-content' }}
                            // rowSelection={rowSelection} 
                            columns={mergedColumns} 
                            dataSource={dataSource} 
                            components={{
                                body: {
                                        cell: EditableCell,
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

            {/* {currentUser ? ( */}
                <EditUserModal
                    user={user}
                    isOpen={userEditIsOpen}
                    onClose={onUserEditClose}
                    dataSource={dataSource}
                    currentUser={currentUser}
                    setDataSource={setDataSource}
                    setCurrentUser={setCurrentUser}
                    isEditing={isEditingUser}
                    setIsEditingUser={setIsEditingUser}
                    start={start}
                    roles={roles}
                />
            {/* ) : (
                ' '
            )} */}
        </>
    );
};
export default UsersTable;