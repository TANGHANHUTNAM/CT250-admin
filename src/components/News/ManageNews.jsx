import {
  Checkbox,
  Col,
  Dropdown,
  Image,
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
import { IoEyeOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import StatusCodes from "../../utils/StatusCodes";
import SearchFilterInput from "./SearchFilterInput";
import useDynamicTitle from "../../hooks/useDynamicTitle";
import {
  changeStatusNewsService,
  getAllNewsService,
} from "../../services/newsService";
import Avatar from "../avatar/Avatar";
import ModalViewContentNews from "./ModalViewContentNews";
import { Link } from "react-router-dom";
import ModalEditNews from "./ModalEditNews";

const ManageNews = () => {
  useDynamicTitle("Quản lý tin tức");
  const LIMIT = 4;
  // Modal
  const [isOpenModalViewNews, setIsOpenModalViewNews] = useState(false);
  const [isOpenModalEditNews, setIsOpenModalEditNews] = useState(false);

  // Table
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(LIMIT);
  const [total, setTotal] = useState(0);

  const [listNews, setListNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState({
    key: "",
    value: "Chọn sắp xếp",
  });
  const [filterStatusNews, setFilterStatusNews] = useState({
    key: "",
    value: "Chọn trạng thái",
  });
  const [search, setSearch] = useState("");

  const [detailContent, setDetailContent] = useState("");

  const debouncedFetchNews = useCallback(
    debounce(() => {
      fetchNews();
    }, 300),
    [currentPage, pageSize, search, sortBy, filterStatusNews],
  );

  useEffect(() => {
    debouncedFetchNews();
    return () => {
      debouncedFetchNews.cancel();
    };
  }, [debouncedFetchNews]);

  const fetchNews = async () => {
    setIsLoading(true);
    let query = `page=${currentPage}&limit=${pageSize}`;
    if (search) query += `&search=${search}`;
    if (filterStatusNews.key) query += `&published=${filterStatusNews.key}`;
    if (sortBy.key) query += `&sortBy=${sortBy.key}`;
    try {
      const res = await getAllNewsService(query);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        setListNews(res.DT.data);
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
    setFilterStatusNews({
      key: "",
      value: "Chọn trạng thái",
    });
    setSearch("");
    setCheckedList(defaultCheckedList);
  };

  const handleActiveNews = async (id, data) => {
    setIsLoading(true);
    try {
      const res = await changeStatusNewsService(id, data);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success("Thay đổi trạng thái tin tức thành công");
        fetchNews();
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
      title: "Tác giả",
      dataIndex: "authorName",
      key: "author",
      align: "center",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Avatar size={32} src={record?.authorAvatar} />
            <span>{record?.authorFullName}</span>
          </Space>
        );
      },
    },
    {
      title: "Tiêu đề tin tức",
      dataIndex: "title",
      key: "title",
      align: "center",
      render: (title) => {
        return <span className="font-medium">{title}</span>;
      },
    },
    {
      title: "Ảnh mô tả",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (image) => {
        return <Image src={image} width={150} height={100} alt="image" />;
      },
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      align: "center",
      render: (slug) => {
        return <span>{slug}</span>;
      },
    },
    {
      title: "Ngày đăng",
      dataIndex: "publishedAt",
      key: "publishedAt",
      align: "center",
      render: (publishedAt) => {
        return (
          <span>
            {publishedAt
              ? new Date(publishedAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "--"}
          </span>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "isPublished",
      key: "isPublished",
      align: "center",
      render: (isPublished) => {
        return (
          <Tag color={isPublished ? "green" : "red"}>
            {isPublished ? "Đã đăng".toUpperCase() : "Chưa đăng".toUpperCase()}
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
        return (
          <span>
            {new Date(createdAt).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        );
      },
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      render: (updatedAt) => {
        return (
          <span>
            {new Date(updatedAt).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
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
            {/* Xem nội dung */}
            <Tooltip title="Xem nội dung">
              <button
                onClick={() => {
                  setDetailContent(record);
                  setIsOpenModalViewNews(true);
                }}
                className="text-blue-500"
              >
                <IoEyeOutline />
              </button>
            </Tooltip>
            {/* Chỉnh sửa coupon */}
            <Tooltip title="Chỉnh sửa tin tức">
              <button
                onClick={() => {
                  setDetailContent(record);
                  setIsOpenModalEditNews(true);
                }}
                className="text-yellow-500"
              >
                <CiEdit />
              </button>
            </Tooltip>
            <Tooltip title={record?.isPublished ? "Không đăng" : "Đăng"}>
              <Switch
                className="mb-2"
                size="small"
                checked={record?.isPublished}
                defaultChecked={record?.isPublished}
                onChange={(e) => {
                  handleActiveNews(record?._id, { isPublished: e });
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
            filterStatusNews={filterStatusNews}
            setFilterStatusNews={setFilterStatusNews}
            sortBy={sortBy}
            setSortBy={setSortBy}
            setCurrentPage={setCurrentPage}
          />
        </div>
        {/* Button */}
        <div className="flex space-x-1.5">
          <Link
            to="/create-news"
            className="flex w-fit items-center justify-center gap-1 rounded-md bg-blue-500 px-2 py-1.5 text-primary hover:bg-blue-500/90 hover:text-primary"
          >
            <IoMdAddCircleOutline />
            <span>Thêm tin tức mới</span>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="p-3">
      <Row gutter={[0, 10]}>
        <Col span={12}>
          <div className="ml-2 py-1 text-3xl font-semibold uppercase text-blue-500">
            Quản lý tin tức
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
            dataSource={listNews}
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
      <ModalViewContentNews
        detailContent={detailContent}
        setIsOpenModalViewNews={setIsOpenModalViewNews}
        isOpenModalViewNews={isOpenModalViewNews}
      />
      <ModalEditNews
        fetchNews={fetchNews}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        detailContent={detailContent}
        setDetailContent={setDetailContent}
        isOpenModalEditNews={isOpenModalEditNews}
        setIsOpenModalEditNews={setIsOpenModalEditNews}
      />
    </div>
  );
};

export default ManageNews;
