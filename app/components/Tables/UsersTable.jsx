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
import { getRandomRoles } from '../../utils/common';

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
      <td {...restProps}>
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
    const [user, setUser] = useState(null);
    const [statusState, setStatusState] = useState('');
    const [isSavingStatus, setIsSavingStatus] = useState({});
    const {
        isOpen: userEditIsOpen,
        onOpen: onUserEditOpen,
        onClose: onUserEditClose,
    } = useDisclosure();

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

    const cancel = () => {
        setEditingKey('');
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            rowScope: 'row',
            render: (text, record, index) => <a>{record.key + 1}</a>,

        },
        {
            key: '1',
            title: 'First Name',
            dataIndex: 'fname',
            editable: true,
            render: (text) => <a>{text}</a>,
        },
        {
            key: '2',
            title: 'Last Name',
            dataIndex: 'lname',
            editable: true,
        },
        {
            key: '3',
            title: 'Username',
            dataIndex: 'username',
            editable: true,
        },
        {
            key: '4',
            title: 'Email',
            dataIndex: 'email',
            editable: true,
        },
        {
            key: '5',
            title: 'Status',
            dataIndex: 'status',
            editable: false,
            render: (text, record, index) => (
                <Space size="middle">
                    <button
                        className={`btn btn-sm flex items-center gap-2 ${record.status == 1 ? 'btn-success' : 'btn-danger'}`}
                        disabled={isSavingStatus[record.key]}
                        aria-disabled={isSavingStatus[record.key]}
                        onClick={
                            // setIsSavingStatus(true);
                            // setCurrentUser(record);
                            ()=>toggleCurrentPersonStatus(text, record, index, record.status)
                          }
                          >
                                {isSavingStatus[record.key] ? (
                                    <>
                                        <LoaderIcon
                                            extraClass="text-white"
                                            className="animate-spin mr-1"
                                        />
                                    </>
                                ) : (
                                    ''
                                )}
                                {record.status === 1 ? 'Active' : 'Inactive'}
                    </button>
                </Space>
            ),
        },
        {
            title: 'Action',
            key: '5',
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
        console.log('Validate Failed:', errInfo);
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
        setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    
    const hasSelected = selectedRowKeys.length > 0;

    useEffect(()=>{
        setTimeout(()=>{
            setDataSource(dataSourceData);
            setIsLoading(false);
        }, 100);
    }, [])


    // const toggleCurrentPersonStatus = (data) => {
    //     console.log(data)
    //     data.status = data.status === 1 ? 0 : 1;
    // }

    const toggleCurrentPersonStatus = async(text, record, index, status) => {
        let key = record.key
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
                    
                const updatedRecord = { ...record, status: record.status === 1 ? 0 : 1 };
                const updatedDataSource = dataSource.map(item => 
                    item.id === record.id ? updatedRecord : item
                );
        
                setDataSource(updatedDataSource);
        
                setTimeout(() => {
                    setIsSavingStatus({
                        [key]: false
                    });

                    msg = 'Successfully '+ (updatedRecord.status === 1 ? 'Activated' : 'Deactivated')  + '!!'
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
                console.log(err, 'err');
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
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            allowOutsideClick: () => !Swal.isLoading(), // Prevent clicking outside modal during loading
            showLoaderOnConfirm: true,
            preConfirm: async (login) => {
                const newData = dataSource.filter((item) => item.id !== data.id);
                setDataSource(newData);
                // try {
                //   const githubUrl = `
                //     https://api.github.com/users/${login}
                //   `;
                //   const response = await fetch(githubUrl);
                //   if (!response.ok) {
                //     return Swal.showValidationMessage(`
                //       ${JSON.stringify(await response.json())}
                //     `);
                //   }
                //   return response.json();
                // } catch (error) {
                //   Swal.showValidationMessage(`
                //     Request failed: ${error}
                //   `);
                // }
                },
        }).then((result) => {
            
            if (result.isConfirmed) {
                Swal.fire(
                'Deleted!',
                'The Role has been deleted.',
                'success'
                );
            }
            // hrBaseService.deleteResource(
            //     data?.id,
            //     function (resp) {
            //       var id = data?.id;
            //     //   var index = lodash.findLastIndex($scope.model.resources, [
            //     //     'id',
            //     //     id,
            //     //   ]);
            //     //   if (index != -1) $scope.model.resources.splice(index, 1);

            //       if (resp.data.success) Swal(resp.data.success);
            //       else Swal('Delete successfully');
            //     },
            //     function (resp) {
            //         Swal({
            //         type: 'error',
            //         title: 'Delete Failed!',
            //       });
            //     }
            //   );
        });
    };

    return (
        <>
            {isLoading ? 
            (
                <div className='h-full flex items-center justify-center'>
                    <LoaderIcon2
                        extraClass="text-[#034343]"
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
                            {/* <Link href={'/admin/users/roles'} className="btn-primary">
                                Roles
                            </Link> */}
                        </Flex>
                        <Table 
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
                                onChange: cancel,
                            }}
                            />
                    </Flex>
                </Form>
            )}

            {currentUser ? (
                <EditUserModal
                    user={user}
                    isOpen={userEditIsOpen}
                    onClose={onUserEditClose}
                    dataSource={dataSource}
                    currentUser={currentUser}
                    setDataSource={setDataSource}
                    setCurrentUser={setCurrentUser}
                />
            ) : (
                ' '
            )}
        </>
    );
};
export default UsersTable;