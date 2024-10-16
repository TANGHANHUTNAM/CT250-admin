import React, { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import {
  Checkbox,
  Col,
  Dropdown,
  Menu,
  Popconfirm,
  Row,
  Space,
  Table,
} from "antd";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import ModalCreateDiscount from "./ModalCreateDiscount";
import ModalCreateTypeDiscount from "./ModalCreateTypeDiscount";
import ModalEditDiscount from "./ModalEditDiscount";
import ModalViewTypeDiscount from "./ModalViewTypeDiscount";
import ModalViewDiscount from "./ModalViewDiscount";
import SearchFilterInput from "./SearchFilterInput";

const ManageDiscount = () => {
  // Modal
  const [openModalCreateTable, setOpenModalCreateTable] = useState(false);
  const [openModalViewTable, setOpenModalViewTable] = useState(false);
  const [openModalEditTable, setOpenModalEditTable] = useState(false);
  const [openModalCreateTypeTable, setOpenModalCreateTypeTable] =
    useState(false);
  const [openModalViewTypeTable, setOpenModalViewTypeTable] = useState(false);

  // Table
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [total, setTotal] = useState(0);
  const [listTable, setListTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterTypeTable, setFilterTypeTable] = useState({
    key: "",
    value: "Chọn loại coupon",
  });
  const [filterStatusTable, setFilterStatusTable] = useState({
    key: "",
    value: "Chọn trạng thái",
  });
  const [dataSearch, setDataSearch] = useState("");
  const [search, setSearch] = useState("");

  const [detailTable, setDetailTable] = useState(null);

  useEffect(() => {
    setListTable(data);
    setTotal(data.length);
  }, []);

  useEffect(() => {
    fetchListTable();
  }, [currentPage, pageSize, filterTypeTable, filterStatusTable, search]);

  const fetchListTable = async () => {
    setIsLoading(true);
    setTimeout(() => {
      let query = `page=${currentPage}&limit=${pageSize}`;
      if (filterTypeTable.key) {
        query += `&tableType=/${filterTypeTable.key}/i`;
      }
      if (filterStatusTable.key) {
        query += `&tableStatus=/${filterStatusTable.key}/i`;
      }
      if (search) {
        query += `&tableNumber=/${search}/i`;
      }

      // Call API
      console.log("localhost:8081/", query);

      setIsLoading(false);
    }, 500);
  };

  const handleDeleteTable = (_id) => {
    console.log(_id);
  };
  const handleTableChange = (pagination, filters, sorter) => {
    if (pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
    }
    if (pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrentPage(1);
    }
  };
  const handleSearch = (value) => {
    if (value === "") {
      return;
    }
    setSearch(value);
    setCurrentPage(1);
  };
  const handleReset = () => {
    setCurrentPage(1);
    setPageSize(1);
    setFilterTypeTable({
      key: "",
      value: "Chọn loại bàn",
    });
    setFilterStatusTable({
      key: "",
      value: "Chọn trạng thái",
    });
    setSearch("");
    setDataSearch("");
    setCheckedList(defaultCheckedList);
  };
  const columns = [
    {
      title: "STT",
      key: "STT",
      width: 50,
      align: "center",
      render: (_, __, index) => (
        <span className="font-semibold">
          {(currentPage - 1) * pageSize + index + 1}
        </span>
      ),
    },
    {
      title: "Code",
      dataIndex: "couponCode",
      key: "couponCode",
      render: (field) => {
        return <span>{`Bàn số ${field}`}</span>;
      },
    },
    {
      title: "Loại",
      dataIndex: "couponType",
      key: "couponType",
      render: (field) => {
        return <span>{field.name}</span>;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (field) => {
        return (
          <Space size="small">
            <span>{field.name}</span>
            <span>{`(${field.capacity} người)`}</span>
          </Space>
        );
      },
    },
    {
      title: "Ngày áp dụng",
      dataIndex: "startDate",
      key: "startDate",
      render: (field) => {
        return <span>{field.name}</span>;
      },
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "endDate",
      key: "endDate",
      render: (field) => {
        return <span>{field.name}</span>;
      },
    },
    {
      title: "Minium price to use",
      dataIndex: "minPrice",
      key: "minPrice",
      render: (field) => {
        return (
          <Space size="small">
            <span>{field.name}</span>
            <span>{`(${field.capacity} người)`}</span>
          </Space>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "couponStatus",
      key: "couponStatus",
      render: (field) => {
        return (
          <Space size="small">
            <span>{field.name}</span>
            <span>{`(${field.capacity} người)`}</span>
          </Space>
        );
      },
    },
    {
      title: "Hành động",
      key: "action",
      width: "10% ",
      align: "center",
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
              title="Xóa bàn này?"
              description="Bạn có chắc chắn muốn xóa bàn này?"
              onConfirm={() => handleDeleteTable(record._id)}
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
    // {
    //   _id: "1",
    //   tableNumber: "1",
    //   couponStatus: {
    //     _id: "1",
    //     name: "Trống",
    //   },
    //   tableType: {
    //     _id: "1",
    //     name: "small",
    //     capacity: 4,
    //   },
    // },
    // {
    //   _id: "2",
    //   tableNumber: "2",
    //   couponStatus: {
    //     _id: "2",
    //     name: "Đặt trước",
    //   },
    //   tableType: {
    //     _id: "2",
    //     name: "medium",
    //     capacity: 6,
    //   },
    // },
    // {
    //   _id: "3",
    //   tableNumber: "3",
    //   couponStatus: {
    //     _id: "3",
    //     name: "Đang sử dụng",
    //   },
    //   tableType: {
    //     _id: "3",
    //     name: "large",
    //     capacity: 8,
    //   },
    // },
  ];

  // Setting Table
  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));
  const newColumns = columns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key),
  }));
  const menuSetting = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Checkbox.Group
              value={checkedList}
              options={options}
              onChange={(value) => {
                setCheckedList(value);
              }}
              onClick={(e) => e.stopPropagation()}
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            />
          ),
        },
      ]}
    />
  );

  // Header Table
  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between">
        {/* Filter, Search, Setting  */}
        <div className="flex items-center justify-center gap-1.5">
          {/* Setting */}
          <Dropdown overlay={menuSetting} trigger={["hover"]}>
            <div className="cursor-pointer rounded-md bg-blue-500 p-2 text-lg text-white">
              <IoSettingsSharp />
            </div>
          </Dropdown>
          {/* Filter */}
          <SearchFilterInput
            search={search}
            setSearch={setSearch}
            dataSearch={dataSearch}
            setDataSearch={setDataSearch}
            handleSearch={handleSearch}
            filterTypeTable={filterTypeTable}
            filterStatusTable={filterStatusTable}
            setFilterStatusTable={setFilterStatusTable}
            setFilterTypeTable={setFilterTypeTable}
            setCurrentPage={setCurrentPage}
          />
        </div>
        {/* Button */}
        <div className="flex space-x-1.5">
          <button
            onClick={() => setOpenModalCreateTable(true)}
            className="flex w-fit items-center justify-center gap-1 rounded-md bg-blue-500 px-2 py-1.5 text-primary hover:bg-blue-500/80"
          >
            <IoMdAddCircleOutline />
            <span>Thêm coupon</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-3">
      <Row gutter={[0, 10]}>
        <Col span={12}>
          <div className="ml-2 py-1 text-3xl font-semibold uppercase text-blue-500">
            Quản lý coupon
          </div>
        </Col>
        <Col span={12}>
          <div className="flex justify-end pr-2">
            <button
              onClick={() => handleReset()}
              className="flex items-center justify-center gap-1 rounded-md bg-blue-500 p-2 text-white hover:bg-blue-500/90"
            >
              <GrPowerReset />
              <span>Reset</span>
            </button>
          </div>
        </Col>
        <Col span={24}>
          <Table
            size="middle"
            title={renderHeader}
            bordered
            columns={newColumns}
            dataSource={listTable}
            rowKey={(record) => record._id}
            onChange={handleTableChange}
            loading={isLoading}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: total,
              showTotal: (total) => `Số lượng: ${total}`,
            }}
          />
        </Col>
      </Row>
      <ModalCreateDiscount
        openModalCreateTable={openModalCreateTable}
        setOpenModalCreateTable={setOpenModalCreateTable}
      />
      <ModalEditDiscount
        openModalEditTable={openModalEditTable}
        setOpenModalEditTable={setOpenModalEditTable}
      />
      <ModalViewDiscount
        detailTable={detailTable}
        openModalViewTable={openModalViewTable}
        setOpenModalViewTable={setOpenModalViewTable}
      />
    </div>
  );
};

export default ManageDiscount;