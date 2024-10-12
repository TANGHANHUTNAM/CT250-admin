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
import { IoSettingsSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import SearchFilterInput from "./SearchFilterInput";
import { GrPowerReset } from "react-icons/gr";
import ModalCreateEmployee from "./ModalCreateEmployee";
import ModalViewUser from "./ModalViewUser";

const ManageUser = () => {
  // Modal
  const [openModalCreateEmployee, setOpenModalCreateEmployee] = useState(false);
  const [openModalViewUser, setOpenModalViewUser] = useState(false);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [total, setTotal] = useState(0);
  // Table
  const [listTable, setListTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterRole, setFilterRole] = useState({
    key: "",
    value: "Chọn vai trò",
  });
  const [dataSearch, setDataSearch] = useState("");
  const [search, setSearch] = useState("");
  const [detailUser, setDetailUser] = useState(null);

  useEffect(() => {
    setListTable(data);
    setTotal(data.length);
  }, []);

  useEffect(() => {
    fetchListTable();
  }, [currentPage, pageSize, filterRole, search]);

  const fetchListTable = async () => {
    setIsLoading(true);
    setTimeout(() => {
      let query = `page=${currentPage}&limit=${pageSize}`;
      if (filterRole.key) {
        query += `&role=/${filterRole.key}/i`;
      }
      if (search) {
        query += `&fullname=/${search}/i`;
      }

      // Call API
      console.log("localhost:8081/", query);

      setIsLoading(false);
    }, 500);
  };

  const handleDeleteUser = (_id) => {
    console.log(_id);
  };
  const handleChangeUserTable = (pagination, filters, sorter) => {
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
    setFilterRole({ key: "", value: "Chọn vai trò" });
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
      title: "Tên bàn",
      dataIndex: "tableNumber",
      key: "tableNumber",
      render: (field) => {
        return <span>{`Bàn số ${field}`}</span>;
      },
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
      title: "Loại bàn",
      dataIndex: "tableType",
      key: "tableType",
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
                setDetailUser(record);
                setOpenModalViewUser(true);
              }}
              className="text-blue-500"
            >
              <MdOutlineRemoveRedEye />
            </button>
            <button className="text-yellow-500">
              <CiEdit />
            </button>
            <Popconfirm
              title="Xóa tài khoản"
              description="Bạn có chắc chắn muốn xóa tài khoản này?"
              onConfirm={() => handleDeleteUser(record._id)}
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
      _id: "1",
      tableNumber: "1",
      tableStatus: {
        _id: "1",
        name: "Trống",
      },
      tableType: {
        _id: "1",
        name: "small",
        capacity: 4,
      },
    },
    {
      _id: "2",
      tableNumber: "2",
      tableStatus: {
        _id: "2",
        name: "Đặt trước",
      },
      tableType: {
        _id: "2",
        name: "medium",
        capacity: 6,
      },
    },
    {
      _id: "3",
      tableNumber: "3",
      tableStatus: {
        _id: "3",
        name: "Đang sử dụng",
      },
      tableType: {
        _id: "3",
        name: "large",
        capacity: 8,
      },
    },
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
            filterRole={filterRole}
            setFilterRole={setFilterRole}
            setCurrentPage={setCurrentPage}
          />
        </div>
        {/* Button */}
        <div className="flex space-x-1.5">
          <button
            onClick={() => setOpenModalCreateEmployee(true)}
            className="flex w-fit items-center justify-center gap-1 rounded-md bg-blue-500 px-2 py-1.5 text-primary hover:bg-blue-500/80"
          >
            <IoMdAddCircleOutline />
            <span>Thêm người dùng</span>
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
            Quản lý người dùng
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
            onChange={handleChangeUserTable}
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
      <ModalCreateEmployee
        openModalCreateEmployee={openModalCreateEmployee}
        setOpenModalCreateEmployee={setOpenModalCreateEmployee}
      />
      <ModalViewUser
        detailUser={detailUser}
        openModalViewUser={openModalViewUser}
        setOpenModalViewUser={setOpenModalViewUser}
      />
    </div>
  );
};

export default ManageUser;
