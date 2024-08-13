'use client'

import React, { useEffect, useState } from 'react';
import { LoaderIcon2 } from '../IconComponent';
import Swal from 'sweetalert2';
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


const dataSourceData = Array.from({
    length: 10,
  }).map((_, i) => ({
    key: i++,
    id: i++,
    name: `Edward ${i++}`,
    permissionLevel: `King ${i++}`,
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
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            key: '2',
            title: 'Permission Level',
            dataIndex: 'permissionLevel',
            render: (text) => <a>{text}</a>,
        },
        {
            key: '3',
            title: 'Submission',
            dataIndex: 'submission',
            render: (_, record) => (
                <input type='checkbox' />
            ),

        },
        {
            key: '4',
            title: 'Review',
            dataIndex: 'review',
            render: (_, record) => (
                <input type='checkbox' />
            ),
        },
        {
            key: '5',
            title: 'CopyEditing',
            dataIndex: 'copyediting',
            render: (_, record) => (
                <input type='checkbox' />
            ),
        },
        {
            key: '6',
            title: 'Production',
            dataIndex: 'production',
            render: (_, record) => (
                <input type='checkbox' />
            ),
        },
        {
            title: 'Action',
            key: '7',
            render: (_, record) => (
            <Space size="middle">
                <a>Edit</a>
                <a onClick={(e)=>deleteRole(record)}>Delete</a>
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

      }, [])
    

    const handleCheckboxChange = async (key) => {
        const newData = dataSource.map(item => {
            if (item.key === key) {
            return { ...item, submission: item.submission === 1 ? 0 : 1 };
            }
            return item;
        });
        setDataSource(newData);
        
        // Call API to update the backend
        await fetch('/api/update-submission', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, submission: item.submission === 1 ? 0 : 1 })
        });
    };

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
                    <Button type="default" onClick={start} loading={loading}>
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
    </>
  )
}

export default RolesTable
