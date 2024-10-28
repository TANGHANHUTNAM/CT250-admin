import {
  Checkbox,
  Col,
  Dropdown,
  Menu,
  Row,
  Space,
  Switch,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import {
  addCoupon,
  changeStatusCoupon,
  getAllCouponWithFilter,
  updateCoupon,
} from "../../services/couponService";
import { formatCurrency } from "../../utils/format";
import StatusCodes from "../../utils/StatusCodes";
import ModalCreateDiscount from "./ModalCreateDiscount";
import ModalEditDiscount from "./ModalEditDiscount";
import SearchFilterInput from "./SearchFilterInput";
import useDynamicTitle from "../../hooks/useDynamicTitle";

const ManageDiscount = () => {
  useDynamicTitle("Quản lý coupon");
  const LIMIT = 7;
  // Modal
  const [openModalCreateCoupon, setOpenModalCreateCoupon] = useState(false);
  const [openModalEditCoupon, setOpenModalEditCoupon] = useState(false);

  // Table
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(LIMIT);
  const [total, setTotal] = useState(0);

  const [listCoupon, setListCoupon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState({
    key: "",
    value: "Chọn sắp xếp",
  });
  const [filterTypeCoupon, setFilterTypeCoupon] = useState({
    key: "",
    value: "Chọn loại giảm giá",
  });
  const [filterStatusCoupon, setFilterStatusCoupon] = useState({
    key: "",
    value: "Chọn trạng thái",
  });
  const [search, setSearch] = useState("");
  const [detailCoupon, setDetailCoupon] = useState(null);

  const debouncedFetchCoupon = useCallback(
    debounce(() => {
      fetchCoupon();
    }, 300),
    [
      currentPage,
      pageSize,
      search,
      sortBy,
      filterTypeCoupon,
      filterStatusCoupon,
    ],
  );

  useEffect(() => {
    debouncedFetchCoupon();
    return () => {
      debouncedFetchCoupon.cancel();
    };
  }, [debouncedFetchCoupon]);

  const fetchCoupon = async () => {
    setIsLoading(true);
    let query = `page=${currentPage}&limit=${pageSize}`;
    if (search) query += `&search=${search}`;
    if (filterTypeCoupon.key) query += `&type=${filterTypeCoupon.key}`;
    if (filterStatusCoupon.key) query += `&active=${filterStatusCoupon.key}`;
    if (sortBy.key) query += `&sortBy=${sortBy.key}`;
    try {
      const res = await getAllCouponWithFilter(query);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        setListCoupon(res.DT.data);
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

  const handleChangeTable = (pagination) => {
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
    setSortBy({
      key: "",
      value: "Chọn sắp xếp",
    });
    setFilterTypeCoupon({
      key: "",
      value: "Chọn loại giảm giá",
    });
    setFilterStatusCoupon({
      key: "",
      value: "Chọn trạng thái",
    });
    setSearch("");
    setCheckedList(defaultCheckedList);
  };

  const handleCreateCoupon = async (data) => {
    setIsLoading(true);
    try {
      const res = await addCoupon(data);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success("Thêm coupon thành công");
        fetchCoupon();
        setOpenModalCreateCoupon(false);
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleEditCoupon = async (id, data) => {
    setIsLoading(true);
    try {
      const res = await updateCoupon(id, data);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success("Cập nhật coupon thành công");
        fetchCoupon();
        setOpenModalEditCoupon(false);
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleActiveCoupon = async (id, data) => {
    setIsLoading(true);
    try {
      const res = await changeStatusCoupon(id, data);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success("Thay đổi trạng thái coupon thành công");
        fetchCoupon();
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
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
      title: "Mã code",
      dataIndex: "code",
      key: "code",
      align: "center",
      width: 150,
      render: (code) => {
        return <span className="font-medium">{code}</span>;
      },
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (type) => {
        return (
          <span>{type ? "Giảm giá theo %" : "Giảm giá theo giá VNĐ"}</span>
        );
      },
    },
    {
      title: "Giá trị",
      dataIndex: "value",
      key: "value",
      align: "center",
      render: (value, record) => {
        return (
          <>
            {record.type ? (
              <Tag color={"green"}>{value}%</Tag>
            ) : (
              <Tag color={"red"}>{formatCurrency(value)}</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (quantity) => {
        return <span>{quantity}</span>;
      },
    },
    {
      title: "Giá thấp nhất để áp dụng",
      dataIndex: "minimumPriceToUse",
      key: "minimumPriceToUse",
      align: "center",
      render: (minimumPriceToUse) => {
        return <span>{formatCurrency(minimumPriceToUse)}</span>;
      },
    },
    {
      title: "Ngày áp dụng",
      dataIndex: "startDate",
      key: "startDate",
      align: "center",
      render: (startDate) => {
        return <span>{startDate}</span>;
      },
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "endDate",
      key: "endDate",
      align: "center",
      render: (endDate) => {
        return <span>{endDate}</span>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (active) => {
        return (
          <Tag color={active ? "green" : "red"}>
            {active ? "Active".toUpperCase() : "Inactive".toUpperCase()}
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
      title: "Hành động",
      key: "action",
      width: "10% ",
      align: "center",
      render: (_, record) => {
        return (
          <Space size="middle" className="text-xl">
            {/* Chỉnh sửa coupon */}
            <button
              onClick={() => {
                setDetailCoupon(record);
                setOpenModalEditCoupon(true);
              }}
              className="text-yellow-500"
            >
              <CiEdit />
            </button>
            <Tooltip title={record?.active ? "Tắt kích hoạt" : "Kích hoạt"}>
              <Switch
                size="small"
                checked={record?.active}
                defaultChecked={record?.active}
                onChange={(e) => {
                  handleActiveCoupon(record?._id, { active: e });
                }}
              />
            </Tooltip>
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
            filterTypeCoupon={filterTypeCoupon}
            setFilterTypeCoupon={setFilterTypeCoupon}
            filterStatusCoupon={filterStatusCoupon}
            setFilterStatusCoupon={setFilterStatusCoupon}
            sortBy={sortBy}
            setSortBy={setSortBy}
            setCurrentPage={setCurrentPage}
          />
        </div>
        {/* Button */}
        <div className="flex space-x-1.5">
          <button
            onClick={() => setOpenModalCreateCoupon(true)}
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
            dataSource={listCoupon}
            rowKey={(record) => record._id}
            onChange={handleChangeTable}
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
        openModalCreateCoupon={openModalCreateCoupon}
        setOpenModalCreateCoupon={setOpenModalCreateCoupon}
        isLoading={isLoading}
        handleCreateCoupon={handleCreateCoupon}
      />
      <ModalEditDiscount
        detailCoupon={detailCoupon}
        handleEditCoupon={handleEditCoupon}
        isLoading={isLoading}
        openModalEditCoupon={openModalEditCoupon}
        setOpenModalEditCoupon={setOpenModalEditCoupon}
      />
    </div>
  );
};

export default ManageDiscount;
