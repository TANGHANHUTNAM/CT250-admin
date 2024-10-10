import React from 'react';
import { Table, Avatar, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import data from '../../../public/locales/ct250.accounts.json';
import { useTranslation } from 'react-i18next';

const EmployeesList = () => {
  const employees = data;
  const { t } = useTranslation();
  const columns = [
    {
      title: 'Photo',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => <Avatar size={48} src={avatar.url} />,
    },
    {
      title: t("EmployeeList.employeeName"),
      dataIndex: 'username',
      key: 'username',
      width: "350px",
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      title: t("EmployeeList.employeeRole"),
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: "300px",
      render: (email) => <span>{email}</span>,
    },
    {
      title: t("EmployeeList.employeePhone"),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (phoneNumber) => <span>{phoneNumber}</span>,
    },
    {
      title: t("EmployeeList.action"),
      key: 'action',
      width: "200px",
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record._id.$oid)}
          >
            {t("EmployeeList.editButt")}
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id.$oid)}
          >
            {t("EmployeeList.deleteButt")}
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (id) => {
    // Logic để xử lý khi bấm nút Edit
    console.log('Edit employee with ID:', id);
  };

  const handleDelete = (id) => {
    // Logic để xử lý khi bấm nút Delete
    console.log('Delete employee with ID:', id);
  };

  return (
    <div>
      <Table
        columns={columns}
        size='small'
        dataSource={employees.map((employee) => ({
          ...employee,
          key: employee._id.$oid,
        }))}
        pagination={false} // Nếu bạn muốn phân trang, bạn có thể bật lên
      />
    </div>
  );
};

export default EmployeesList;
