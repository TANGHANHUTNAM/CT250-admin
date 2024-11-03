import {
  Checkbox,
  Col,
  Dropdown,
  Menu,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { CiExport } from "react-icons/ci";
import {
  MdDeleteOutline,
  MdOutlineDeleteForever,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { TfiImport } from "react-icons/tfi";
import { toast } from "react-toastify";
import {
  createMultipleUserRoleStaff,
  deleteUserRoleStaff,
  getAllStaff,
  getAllUserWithFilter,
} from "../../services/accountService";
import StatusCodes from "../../utils/StatusCodes";
import Avatar from "../avatar/Avatar";
import ModalCreateEmployee from "./ModalCreateEmployee";
import ModalImportFile from "./ModalImportFile";
import ModalViewUser from "./ModalViewUser";
import SearchFilterInput from "./SearchFilterInput";
import * as xlsx from "xlsx";
import useDynamicTitle from "../../hooks/useDynamicTitle";
const ManageUser = () => {
  useDynamicTitle("Quản lý người dùng");
  const LIMIT = 7;
  // Modal
  const [openModalCreateEmployee, setOpenModalCreateEmployee] = useState(false);
  const [openModalViewUser, setOpenModalViewUser] = useState(false);
  const [openModalImportFile, setOpenModalImportFile] = useState(false);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(LIMIT);
  const [total, setTotal] = useState(0);
  // Table
  const [listUser, setListUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterRole, setFilterRole] = useState({
    key: "",
    value: "Chọn vai trò",
  });

  const [search, setSearch] = useState("");
  const [detailUser, setDetailUser] = useState(null);

  const fetchListUser = async () => {
    setIsLoading(true);
    let query = `page=${currentPage}&limit=${pageSize}`;
    if (filterRole.key) {
      query += `&role=${filterRole.key}`;
    }
    if (search) {
      query += `&search=${search}`;
    }
    try {
      const res = await getAllUserWithFilter(query);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        setListUser(res.DT.data);
        setTotal(res.DT.totalData);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const debouncedFetchListUser = useCallback(
    debounce(() => {
      fetchListUser();
    }, 300),
    [currentPage, pageSize, filterRole, search],
  );

  useEffect(() => {
    debouncedFetchListUser();
    return () => {
      debouncedFetchListUser.cancel();
    };
  }, [debouncedFetchListUser]);

  const handleDeleteUser = async (_id) => {
    setIsLoading(true);
    try {
      const res = await deleteUserRoleStaff(_id);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        setCurrentPage(1);
        fetchListUser();
        toast.success("Xóa tài khoản thành công");
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error("Xóa tài khoản không thành công");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const handleImportListStaff = async (data) => {
    setIsLoading(true);
    console.log(data);
    try {
      const res = await createMultipleUserRoleStaff({ data });
      console.log(res);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        fetchListUser();
        toast.success("Import danh sách nhân viên thành công");
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleExportListStaff = async () => {
    try {
      const res = await getAllStaff();
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        // Chuyển đổi dữ liệu thành worksheet
        const worksheet = xlsx.utils.json_to_sheet(res.DT);

        // Thêm hàng tiêu đề tùy chỉnh
        xlsx.utils.sheet_add_aoa(
          worksheet,
          [
            [
              "Avatar",
              "ID",
              "Username",
              "Email",
              "Họ tên",
              "Ngày sinh",
              "Giới tính",
              "Số điện thoại",
              "Địa chỉ",
              "Vai trò",
            ],
          ],
          { origin: "A1" },
        );

        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, "Staff List");

        xlsx.writeFile(workbook, "Staff_List.xlsx");
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeUserTable = (pagination) => {
    if (pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
    }
    if (pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrentPage(1);
    }
  };
  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };
  const handleReset = () => {
    setCurrentPage(1);
    setPageSize(LIMIT);
    setFilterRole({ key: "", value: "Chọn vai trò" });
    setSearch("");
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
      title: "Người dùng",
      dataIndex: "username",
      key: "username",
      with: "10%",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Avatar size={32} src={record.avatar || undefined} />
            <span className="font-medium">{record.username}</span>
          </Space>
        );
      },
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
      key: "fullname",
      render: (text) => text || "--",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => text || "--",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text) => text || "--",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      with: 50,
      render: (text) => {
        return (
          <>{text === "male" ? "Nam" : text === "female" ? "Nữ" : "Khác"}</>
        );
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (text) => text || "--",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (_, { role }) => {
        return (
          <Tag
            color={
              role === "admin" ? "red" : role === "staff" ? "blue" : "green"
            }
          >
            {role.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        return new Date(createdAt).toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_, record) => {
        return (
          <div className="flex justify-center gap-3 text-xl">
            <button
              onClick={() => {
                setDetailUser(record);
                setOpenModalViewUser(true);
              }}
              className="text-blue-500"
            >
              <MdOutlineRemoveRedEye />
            </button>
            <Popconfirm
              disabled={record.role === "customer" || record.role === "admin"}
              title="Xóa tài khoản"
              description="Bạn có chắc chắn muốn xóa tài khoản này?"
              onConfirm={() => handleDeleteUser(record._id)}
              onCancel={() => {}}
              okText="Có"
              cancelText="Không"
            >
              <button
                disabled={record.role === "customer" || record.role === "admin"}
                className="text-red-500"
              >
                {record.role === "customer" || record.role === "admin" ? (
                  <MdOutlineDeleteForever />
                ) : (
                  <MdDeleteOutline />
                )}
              </button>
            </Popconfirm>
          </div>
        );
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
            handleSearch={handleSearch}
            filterRole={filterRole}
            setFilterRole={setFilterRole}
            setCurrentPage={setCurrentPage}
          />
        </div>
        {/* Button */}
        <div className="flex space-x-1.5">
          <button
            onClick={() => setOpenModalImportFile(true)}
            className="flex w-fit items-center justify-center gap-2 rounded-md bg-blue-500 px-3 py-1.5 text-primary hover:bg-blue-500/80"
          >
            <TfiImport className="h-4 w-4" />
            <span>Import</span>
          </button>
          <button
            onClick={() => handleExportListStaff()}
            className="flex w-fit items-center justify-center gap-2 rounded-md bg-blue-500 px-3 py-1.5 text-primary hover:bg-blue-500/80"
          >
            <CiExport className="h-5 w-5" />
            <span>Export</span>
          </button>
          <button
            onClick={() => setOpenModalCreateEmployee(true)}
            className="flex w-fit items-center justify-center gap-1 rounded-md bg-blue-500 px-2 py-1.5 text-primary hover:bg-blue-500/80"
          >
            <IoMdAddCircleOutline />
            <span>Thêm nhân viên</span>
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
            dataSource={listUser}
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
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        fetchListUser={fetchListUser}
        openModalCreateEmployee={openModalCreateEmployee}
        setOpenModalCreateEmployee={setOpenModalCreateEmployee}
      />
      <ModalViewUser
        detailUser={detailUser}
        openModalViewUser={openModalViewUser}
        setOpenModalViewUser={setOpenModalViewUser}
      />
      <ModalImportFile
        isLoading={isLoading}
        handleImportListStaff={handleImportListStaff}
        openModalImportFile={openModalImportFile}
        setOpenModalImportFile={setOpenModalImportFile}
      />
    </div>
  );
};

export default ManageUser;
