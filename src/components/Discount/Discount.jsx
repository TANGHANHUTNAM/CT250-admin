import React from "react";
import { Table, Space, Popconfirm } from "antd";

import { useDynamicTitle } from "../../hooks";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const Discount = () => {
  useDynamicTitle("Quản lý giảm giá");

  const sharedOnCell = (_, index) => {
    console.log("index", _);
    return {};
  };

  const columns = [
    {
      title: "Dishes ID",
      dataIndex: "id",
      key: "id",
      rowScope: "row",
    },
    {
      title: "Dish",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      onCell: (_, index) => ({
        // colSpan: index === 1 ? 5 : 1,
      }),
    },
    {
      title: "Original Price",
      dataIndex: "originalPrice",
      key: "originalPrice",
      onCell: sharedOnCell,
    },
    {
      title: "Discount Rate",
      dataIndex: "discountRate",
      key: "discountRate",
      onCell: sharedOnCell,
    },
    {
      title: "Discount Price",
      dataIndex: "discountPrice",
      key: "discountPrice",
      onCell: sharedOnCell,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      onCell: sharedOnCell,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      onCell: sharedOnCell,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      onCell: sharedOnCell,
    },
    {
      title: "Minimum Price to Use",
      dataIndex: "minPrice",
      key: "minPrice",
      onCell: sharedOnCell,
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      onCell: sharedOnCell,
    },
    {
      title: "Trạng thái",
      dataIndex: "tableStatus",
      key: "tableStatus",
      render: (field) => {
        return <span>{field.name}</span>;
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle" className="text-xl">
            <button
              onClick={() => {
                setDetailTable(record);
                setOpenModalViewTable(true);
              }}
              className="text-blue-500"
            >
              <MdOutlineRemoveRedEye />
            </button>
            <button
              onClick={() => setOpenModalEditTable(true)}
              className="text-yellow-500"
            >
              <CiEdit />
            </button>
            <Popconfirm
              title="Xóa mã này?"
              description="Bạn có chắc chắn muốn xóa mã này?"
              onConfirm={() => handleDeleteTable(record.id)}
              onCancel={() => {}}
              okText="Có"
              cancelText="Không"
            >
              <button className="text-red-500">
                <MdDeleteOutline />
              </button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const data = [
    {
      id: "1",
      name: "Spaghetti Carbonara",
      originalPrice: 150000,
      discountRate: "20%",
      discountPrice: 120000,
      startDate: "2024-10-01",
      endDate: "2024-10-31",
      quantity: 100,
      minPrice: 50000,
      available: "Yes",
      tableStatus: { name: "Active" },
    },
    {
      id: "2",
      name: "Grilled Chicken Salad",
      originalPrice: 90000,
      discountRate: "10%",
      discountPrice: 81000,
      startDate: "2024-10-05",
      endDate: "2024-10-15",
      quantity: 50,
      minPrice: 30000,
      available: "No",
      tableStatus: { name: "Inactive" },
    },
  ];

  return (
    <div className="p-3">
      <Table columns={columns} dataSource={data} bordered />
    </div>
  );
};

export default Discount;
