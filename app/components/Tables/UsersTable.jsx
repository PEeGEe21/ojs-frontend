'use client'

import React, { useEffect, useState } from 'react';
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
import {LoaderIcon2} from '../IconComponent';

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



const dataSource = Array.from({
  length: 100,
}).map((_, i) => ({
  key: i++,
  fname: `Edward ${i++}`,
  lname: `King ${i++}`,
  username: `testuser${i++}`,
  email: `mail${i++}@gmail.com`,
//   description: `testtttt ${i++}`,
//   tags: ['loser'],
}));

const UsersTable = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState(dataSource);
  const [editingKey, setEditingKey] = useState('');
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
    //   {
    //     title: 'Tags',
    //     key: '5',
    //     dataIndex: 'tags',
    //     render: (_, { tags }) => (
    //       <>
    //         {tags.map((tag) => {
    //           let color = tag.length > 5 ? 'geekblue' : 'green';
    //           if (tag === 'loser') {
    //             color = 'volcano';
    //           }
    //           return (
    //             <Tag color={color} key={tag}>
    //               {tag.toUpperCase()}
    //             </Tag>
    //           );
    //         })}
    //       </>
    //     ),
    //   },
    {
        title: 'Action',
        key: '5',
        render: (_, record) => (
        <Space size="middle">
            <a>Edit{record.name}</a>
            <a>Disable {record.name}</a>
            <a>Delete</a>
        </Space>
        ),
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
                        <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </a>
                        <a>Disable {record.name}</a>
                        <a>Delete</a>
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
        setIsLoading(false);
    }, 100);
  }, [])

  

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
                        <Link href={'/admin/users/roles'} className="btn-primary">
                            Roles
                        </Link>
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
    </>
  );
};
export default UsersTable;