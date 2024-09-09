'use client'

import React, { useEffect, useState } from 'react';
import { LoaderIcon2 } from '../IconComponent';
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
import AddRoleModal from '../../components/Modals/roles/AddRoleModal';
import EditRoleModal from '../../components/Modals/roles/EditRoleModal';
import { permissionLevelList } from '../../lib/constants';
import { Edit, Trash } from 'iconsax-react';
import toast from 'react-hot-toast';


const dataSourceData = Array.from({
    length: 10,
  }).map((_, i) => ({
    key: i++,
    id: i++,
    title: `Edward ${i++}`,
    description: `King ${i++}`,
    permission_level: permissionLevelList[Math.floor(Math.random() * permissionLevelList.length)],
    submission: Math.random() < 0.5 ? 1 : 0,
    review: Math.random() < 0.5 ? 1 : 0,
    copyediting: Math.random() < 0.5 ? 1 : 0,
    production: Math.random() < 0.5 ? 1 : 0,
  }));
  
const RolesTable = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [currentRole, setCurrentRole] = useState(null);

    const {
        isOpen: roleIsOpen,
        onOpen: onRoleOpen,
        onClose: onRoleClose,
    } = useDisclosure();
    const {
        isOpen: roleEditIsOpen,
        onOpen: onRoleEditOpen,
        onClose: onRoleEditClose,
    } = useDisclosure();


    const user = null;

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            rowScope: 'row',
            render: (text, record, index) => <a>{record.key + 1}</a>,
    
        },
        {
            key: '1',
            title: 'Role Name',
            dataIndex: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            key: '2',
            title: 'Permission Level',
            dataIndex: 'permission_level',
            render: (text) => <a>{text.title}</a>,
        },
        {
            key: '3',
            title: 'Submission',
            dataIndex: 'submission',
            render: (_, record) => (
                <div className='w-full text-center flex items-center justify-center'>
                    <input 
                        type='checkbox' 
                        checked={record.submission === 1}
                        onChange={() => handleSubmissionChange(record, record.submission)}
                        className='h-4 w-4 cursor-pointer'
                    />
                </div>
            ),
        },
        {
            key: '4',
            title: 'Review',
            dataIndex: 'review',
            render: (_, record) => (
                <div className='w-full text-center flex items-center justify-center'>
                    <input 
                        type='checkbox' 
                        checked={record.review === 1}
                        onChange={() => handleReviewChange(record, record.review)}
                        className='h-4 w-4 cursor-pointer'
                    />
                </div>
            ),
        },
        {
            key: '5',
            title: 'CopyEditing',
            dataIndex: 'copyediting',
            render: (_, record) => (
                <div className='w-full text-center flex items-center justify-center'>
                    <input 
                        type='checkbox' 
                        checked={record.copyediting === 1}
                        onChange={() => handleCopyEditingChange(record, record.copyediting)}
                        className='h-4 w-4 cursor-pointer'
                    />
                </div>

            ),
        },
        {
            key: '6',
            title: 'Production',
            dataIndex: 'production',
            render: (_, record) => (
                <div className='w-full text-center flex items-center justify-center'>
                    <input 
                        type='checkbox' 
                        checked={record.production === 1}
                        onChange={() => handleProductionChange(record, record.production)}
                        className='h-4 w-4 cursor-pointer'
                    />
                </div>
                
            ),
        },
        {
            title: 'Action',
            key: '7',
            render: (_, record) => (
            <Space size="middle">
                <button 
                    className="flex btn btn-info items-center gap-1 text-xs" 
                    onClick={() => {
                        setCurrentRole(record);
                        onRoleEditOpen();
                      }}>
                    <Edit size={14}/> Edit
                </button>
                <button 
                    className="flex btn btn-red items-center gap-1 text-xs" 
                    onClick={(e)=>deleteRole(record)}>
                        <Trash size={12}/> Delete
                </button>
            </Space>
            ),
            // render: (_, record) => {
            //     const editable = isEditing(record);
            //     return editable ? (
            //         <span>
            //             <Typography.Link
            //             onClick={() => save(record.key)}
            //             style={{
            //                 marginInlineEnd: 8,
            //             }}
            //             >
            //             Save
            //             </Typography.Link>
            //             <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            //             <a>Cancel</a>
            //             </Popconfirm>
            //         </span>
            //         ) : (
            //             <Space size="middle">
            //                 <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            //                     Edit
            //                 </a>
            //                 <a>Disable {record.name}</a>
            //                 <a>Delete</a>
            //             </Space>
            //         )
            
            //   },
        },
    ];

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

    useEffect(()=>{
        setTimeout(()=>{
            setDataSource(dataSourceData);
            setIsLoading(false);
        }, 100);
        console.log(dataSource, 'dataSource')

      }, [dataSource])
    

    const handleSubmissionChange = async(record, status) => {
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

        console.log(record, 'record')
        setCurrentRole(record);        
        if(record){
            try {
                    
                const updatedRecord = { ...record, submission: record.submission === 1 ? 0 : 1 };
                const updatedDataSource = dataSource.map(item => 
                    item.id === record.id ? updatedRecord : item
                );

                console.log(updatedRecord, 'updatedRecord')

        
                setDataSource(updatedDataSource);
                msg = 'Successfully Updated!!'
                toast.success(msg, {
                    successOptions,
                    position: "top-right"
                });

        
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
                toast.error(err.message);
            }
        }
    };

    const handleReviewChange = async(record, status) => {
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
        console.log(record, 'record')
        setCurrentRole(record);        
        if(record){
            try {
                    
                const updatedRecord = { ...record, review: record.review === 1 ? 0 : 1 };
                const updatedDataSource = dataSource.map(item => 
                    item.id === record.id ? updatedRecord : item
                );
                console.log(updatedRecord, 'updatedRecord')
                setDataSource(updatedDataSource);

                msg = 'Successfully Updated!!'
                toast.success(msg, {
                    successOptions,
                    position: "top-right"
                });
        
            } catch (err) {
                console.log(err, 'err');
                toast.error(err.message);
            }
        }
    };

    const handleCopyEditingChange = async(record, status) => {
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
        setCurrentRole(record);        
        if(record){
            try {
                    
                const updatedRecord = { ...record, copyediting: record.copyediting === 1 ? 0 : 1 };
                const updatedDataSource = dataSource.map(item => 
                    item.id === record.id ? updatedRecord : item
                );
                console.log(updatedRecord, 'updatedRecord')
                setDataSource(updatedDataSource);

                msg = 'Successfully Updated!!'
                toast.success(msg, {
                    successOptions,
                    position: "top-right"
                });
            } catch (err) {
                console.log(err, 'err');
                toast.error(err.message);
            }
        }
    };

    const handleProductionChange = async(record, status) => {
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
        setCurrentRole(record);        
        if(record){
            try {
                    
                const updatedRecord = { ...record, production: record.production === 1 ? 0 : 1 };
                const updatedDataSource = dataSource.map(item => 
                    item.id === record.id ? updatedRecord : item
                );
                console.log(updatedRecord, 'updatedRecord')
                setDataSource(updatedDataSource);
                msg = 'Successfully Updated!!'
                toast.success(msg, {
                    successOptions,
                    position: "top-right"
                });
            } catch (err) {
                console.log(err, 'err');
                toast.error(err.message);
            }
        }
    };

    useEffect(() => {
    }, [currentRole]);

    // const handleCheckboxChange = async (key) => {
    //     const newData = dataSource.map(item => {
    //         if (item.key === key) {
    //         return { ...item, submission: item.submission === 1 ? 0 : 1 };
    //         }
    //         return item;
    //     });
    //     setDataSource(newData);
        
    //     // Call API to update the backend
    //     await fetch('/api/update-submission', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ key, submission: item.submission === 1 ? 0 : 1 })
    //     });
    // };

    const deleteRole = (data) => {
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
                <Flex gap="middle" vertical>
                    <Flex align="center" gap="middle" justify='end'>
                        <Flex align="center" gap="middle">

                            
                        </Flex>
                        <Button type="primary" onClick={start} loading={loading}>
                            Reload
                        </Button>
                        <Button type="default" onClick={onRoleOpen} loading={loading}>
                            Add Role
                        </Button>
                    </Flex>
                    <Table 
                        // rowSelection={rowSelection} 
                        columns={columns} 
                        dataSource={dataSource}
                        bordered
                        rowClassName="editable-row"
                        pagination={{
                            pageSize: 25,
                            // onChange: cancel,
                        }}
                        />
                </Flex>
            )}

            {/* {currentRole ? ( */}
                <AddRoleModal
                    isOpen={roleIsOpen}
                    onClose={onRoleClose}
                    dataSource={dataSource}
                />
            {/* ) : (
                ''
            )} */}


        {currentRole ? (
            <EditRoleModal
                user={user}
                isOpen={roleEditIsOpen}
                onClose={onRoleEditClose}
                dataSource={dataSource}
                currentRole={currentRole}
                setDataSource={setDataSource}
                setCurrentRole={setCurrentRole}
            />
        ) : (
            ' '
        )}
        </>
    )
}

export default RolesTable