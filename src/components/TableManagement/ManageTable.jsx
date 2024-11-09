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
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import {
  MdDeleteOutline,
  MdOutlineBookmarkAdd,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";

import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { toast } from "react-toastify";
import {
  createTable,
  createTypeTable,
  deleteTable,
  getAllTableWithFilter,
  getAllTypeTable,
  getStatusTable,
  updateTable,
  updateTypeTable,
} from "../../services/tableService";
import StatusCodes from "../../utils/StatusCodes";
import ModalCreateTable from "./ModalCreateTable";
import ModalCreateTypeTable from "./ModalCreateTypeTable";
import ModalEditTable from "./ModalEditTable";
import ModalViewTypeTable from "./ModalViewTypeTable";
import SearchFilterInput from "./SearchFilterInput";
import useDynamicTitle from "../../hooks/useDynamicTitle";

const ManageTable = () => {
  useDynamicTitle("Quản lý bàn");
  const LIMIT = 7;
  // Modal
  const [openModalCreateTable, setOpenModalCreateTable] = useState(false);
  const [openModalEditTable, setOpenModalEditTable] = useState(false);
  const [openModalCreateTypeTable, setOpenModalCreateTypeTable] =
    useState(false);
  const [openModalViewTypeTable, setOpenModalViewTypeTable] = useState(false);

  // Table
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(LIMIT);
  const [total, setTotal] = useState(0);
  const [filterTypeTable, setFilterTypeTable] = useState({
    key: "",
    value: "Chọn loại bàn",
  });
  const [filterStatusTable, setFilterStatusTable] = useState({
    key: "",
    value: "Chọn trạng thái",
  });
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [listTable, setListTable] = useState([]);
  const [listTypeTable, setListTypeTable] = useState([]);
  const [listStatusTable, setListStatusTable] = useState([]);
  const [detailTable, setDetailTable] = useState({});

  const debouncedFetchTable = useCallback(
    debounce(() => {
      fetchListTable();
    }, 300),
    [currentPage, pageSize, filterTypeTable, filterStatusTable, search],
  );

  useEffect(() => {
    debouncedFetchTable();
    return () => {
      debouncedFetchTable.cancel();
    };
  }, [debouncedFetchTable]);

  const fetchListTable = async () => {
    setIsLoading(true);
    let query = `page=${currentPage}&limit=${pageSize}`;
    if (filterTypeTable.key) {
      query += `&type=${filterTypeTable.key}`;
    }
    if (filterStatusTable.key) {
      query += `&status=${filterStatusTable.key}`;
    }
    if (search) {
      query += `&search=${search}`;
    }
    try {
      const res = await getAllTableWithFilter(query);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        setListTable(res.DT.data);
        setTotal(res.DT.totalData);
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchListTypeTable();
    fetchListStatusTable();
  }, []);

  const fetchListTypeTable = async () => {
    try {
      const res = await getAllTypeTable();
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        setListTypeTable(res.DT);
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchListStatusTable = async () => {
    try {
      const res = await getStatusTable();
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        setListStatusTable(res.DT);
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTable = async (data) => {
    setIsLoading(true);
    try {
      const res = await createTable(data);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success("Thêm bàn thành công!");
        fetchListTable();
        setOpenModalCreateTable(false);
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleUpdateTable = async (id, data) => {
    try {
      const res = await updateTable(id, data);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success("Cập nhật bàn thành công!");
        setOpenModalEditTable(false);
        fetchListTable();
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTypeTable = async (data) => {
    try {
      const res = await createTypeTable(data);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success("Thêm loại bàn thành công!");
        fetchListTypeTable();
        setOpenModalCreateTypeTable(false);
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTable = async (_id) => {
    try {
      const res = await deleteTable(_id);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        const newTotalTable = total - 1;
        const newTotalPage = Math.ceil(newTotalTable / pageSize);
        const newPage = Math.max(
          currentPage > newTotalPage ? newTotalPage : currentPage,
          1,
        );
        if (newPage === currentPage) fetchListTable();
        setCurrentPage(newPage);
        toast.success("Xóa bàn thành công!");
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTypeTable = async (id, data) => {
    try {
      const res = await updateTypeTable(id, data);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success("Cập nhật loại bàn thành công!");
        fetchListTable();
        fetchListTypeTable();
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTableChange = (pagination) => {
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
    setFilterTypeTable({
      key: "",
      value: "Chọn loại bàn",
    });
    setFilterStatusTable({
      key: "",
      value: "Chọn trạng thái",
    });
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
      title: "Tên bàn",
      dataIndex: "tableNumber",
      key: "tableNumber",
      align: "center",
      render: (tableNumber) => {
        return <span className="font-medium">{`Bàn số ${tableNumber}`}</span>;
      },
    },

    {
      title: "Loại bàn",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (type) => {
        return <span>{type}</span>;
      },
    },
    {
      title: "Sức chứa",
      dataIndex: "capacity",
      key: "capacity",
      align: "center",
      render: (capacity) => {
        return <span>{capacity}</span>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        return (
          <Tag
            color={
              status === "Đang sử dụng"
                ? "blue"
                : status === "Đặt trước"
                  ? "green"
                  : "red"
            }
          >
            {status}
          </Tag>
        );
      },
    },

    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => {
        return <span>{new Date(createdAt).toLocaleDateString("vi-VN")}</span>;
      },
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      render: (updatedAt) => {
        return <span>{new Date(updatedAt).toLocaleDateString("vi-VN")}</span>;
      },
    },
    {
      title: "Hoạt động",
      dataIndex: "deleted",
      key: "deleted",
      align: "center",
      width: "10%",
      render: (deleted) => {
        return (
          <Tag color={deleted ? "red" : "green"}>
            <span className="">{deleted ? "Đã bỏ" : "Còn sử dụng"}</span>
          </Tag>
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
            <Popconfirm
              disabled={record?.deleted}
              title={`Xóa bàn số ${record?.tableNumber} ?`}
              description="Bạn có chắc chắn muốn xóa bàn này?"
              onConfirm={() => handleDeleteTable(record._id)}
              onCancel={() => {}}
              okText="Có"
              cancelText="Không"
            >
              <button disabled={record.deleted} className="text-red-500">
                {record.deleted ? (
                  <MdOutlineDeleteForever />
                ) : (
                  <MdDeleteOutline />
                )}
              </button>
            </Popconfirm>
          </Space>
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
            filterTypeTable={filterTypeTable}
            filterStatusTable={filterStatusTable}
            setFilterStatusTable={setFilterStatusTable}
            setFilterTypeTable={setFilterTypeTable}
            listStatusTable={listStatusTable}
            listTypeTable={listTypeTable}
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
            <span>Thêm bàn</span>
          </button>
          <button
            onClick={() => setOpenModalCreateTypeTable(true)}
            className="flex w-fit items-center justify-center gap-1 rounded-md bg-blue-500 px-2 py-1.5 text-primary hover:bg-blue-500/90"
          >
            <MdOutlineBookmarkAdd />
            <span>Thêm loại bàn</span>
          </button>
          <button
            onClick={() => setOpenModalViewTypeTable(true)}
            className="flex w-fit items-center justify-center gap-1 rounded-md bg-blue-500 px-2 py-1.5 text-primary hover:bg-blue-500/90"
          >
            <MdOutlineRemoveRedEye />
            <span>Xem loại bàn</span>
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
            Quản lý bàn
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
      <ModalCreateTable
        isLoading={isLoading}
        listTypeTable={listTypeTable}
        handleCreateTable={handleCreateTable}
        openModalCreateTable={openModalCreateTable}
        setOpenModalCreateTable={setOpenModalCreateTable}
      />
      <ModalCreateTypeTable
        isLoading={isLoading}
        handleCreateTypeTable={handleCreateTypeTable}
        openModalCreateTypeTable={openModalCreateTypeTable}
        setOpenModalCreateTypeTable={setOpenModalCreateTypeTable}
      />
      <ModalEditTable
        isLoading={isLoading}
        detailTable={detailTable}
        setDetailTable={setDetailTable}
        listTypeTable={listTypeTable}
        handleUpdateTable={handleUpdateTable}
        openModalEditTable={openModalEditTable}
        setOpenModalEditTable={setOpenModalEditTable}
      />
      <ModalViewTypeTable
        isLoading={isLoading}
        listTypeTable={listTypeTable}
        handleUpdateTypeTable={handleUpdateTypeTable}
        openModalViewTypeTable={openModalViewTypeTable}
        setOpenModalViewTypeTable={setOpenModalViewTypeTable}
      />
    </div>
  );
};

export default ManageTable;
