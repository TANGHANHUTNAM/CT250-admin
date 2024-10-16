import { Col, Image, Popconfirm, Row, Space, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  createCategory,
  deleteCategory,
  getAllCagegory,
  updateCategory,
} from "../../services/categoryService";
import StatusCodes from "../../utils/StatusCodes";
import { toast } from "react-toastify";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import ModalViewCategoryLevel2 from "./ModalViewCategoryLevel2";
import ModalEditCategory from "./ModalEditCategory";
import ModalCreateCategory from "./ModalCreateCategory";

const Category = () => {
  const [openModalEditCategory, setOpenModalEditCategory] = useState(false);
  const [openModalViewCategoryLevel2, setOpenModalViewCategoryLevel2] =
    useState(false);
  const [openModalCreateCategory, setOpenModalCreateCategory] = useState({
    isParent: true,
    open: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [listCategory, setListCategory] = useState([]);
  const [listCategoryLevel2, setListCategoryLevel2] = useState([]);
  const [categoryEdit, setCategoryEdit] = useState({});

  const fetchListCategory = async () => {
    setIsLoading(true);
    try {
      const res = await getAllCagegory();
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        setListCategory(res.DT);
        setTotal(res.DT.length);
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.log("fetchListCategory -> error", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchListCategory();
  }, []);

  const handleCreateCategory = async (data) => {
    setIsLoading(true);
    try {
      const res = await createCategory(data);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success("Thêm danh mục thành công!");
        fetchListCategory();
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.log("handleCreateCategoru -> error", error);
    }
    setIsLoading(false);
  };

  const handleDeleteCategory = async (id) => {
    setIsLoading(true);
    try {
      const res = await deleteCategory(id);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success("Xóa danh mục thành công!");
        setCurrentPage(1);
        fetchListCategory();
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(
          "Danh mục này có danh mục con hoặc các món ăn, không thể xóa!",
        );
      }
    } catch (error) {
      console.log("handleDeleteCategory -> error", error);
    }
    setIsLoading(false);
    setOpenModalViewCategoryLevel2(false);
  };

  const handleUpdateCategory = async (id, data) => {
    setIsLoading(true);
    try {
      const res = await updateCategory(id, data);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success("Cập nhật danh mục thành công!");
        fetchListCategory();
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.log("handleUpdateCategory -> error", error);
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
      title: "Ảnh",
      dataIndex: "image",
      align: "center",
      width: 70,
      render: (image) => <Image width={100} src={image || "error"} />,
    },
    {
      title: "Danh mục cấp 1",
      dataIndex: "name",
      align: "center",
      render: (name) => <span className="font-semibold">{name}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: "50%",
      align: "center",
      render: (description) => <div className="">{description}</div>,
    },
    {
      title: "Danh mục cấp 2",
      dataIndex: "subCategories",
      align: "center",
      render: (subCategories, record) => (
        <Space size="middle">
          <span>số lượng: {subCategories?.length}</span>
          <Tooltip title="Xem danh mục cấp 2">
            <button
              onClick={() => {
                const updatedSubCategories = subCategories.map(
                  (subCategory) => ({
                    ...subCategory,
                    parentId: record._id, // Thêm thuộc tính parentId vào mỗi phần tử
                  }),
                );
                setListCategoryLevel2(updatedSubCategories);
                setOpenModalViewCategoryLevel2(true);
              }}
              className="flex justify-center text-xl text-blue-500 hover:text-blue-500/90"
            >
              <IoEyeOutline />
            </button>
          </Tooltip>
        </Space>
      ),
    },

    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      width: "100px",
      align: "center",
      render: (_, record) => (
        <div className="flex items-center justify-center gap-3">
          <Tooltip title="Sửa danh mục cấp 1">
            <button
              onClick={() => {
                setOpenModalEditCategory(true);
                setCategoryEdit({ isParent: true, ...record });
              }}
              className="flex justify-center text-2xl text-yellow-500"
            >
              <CiEdit />
            </button>
          </Tooltip>
          <Popconfirm
            title={`Xoá danh mục ${record.name}?`}
            description="Bạn có muốn danh mục này?"
            onConfirm={() => {
              if (record.subCategories.length > 0) {
                toast.error("Danh mục này có danh mục con, không thể xóa!");
                return;
              }
              handleDeleteCategory(record._id);
            }}
            onCancel={() => {}}
            okText="Có"
            cancelText="Không"
          >
            <button className="flex justify-center text-2xl text-red-500">
              <MdOutlineDelete />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const handleOnChange = (pagination) => {
    if (pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
    }
    if (pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
    }
  };
  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between">
        {/* Filter, Search, Setting  */}
        <div className="flex items-center justify-center gap-1.5">
          {/* Setting */}
        </div>
        {/* Button */}
        <div className="flex space-x-1.5">
          <button
            onClick={() =>
              setOpenModalCreateCategory({ isParent: true, open: true })
            }
            className="flex w-fit items-center justify-center gap-1 rounded-md bg-blue-500 px-2 py-1.5 text-primary hover:bg-blue-500/80"
          >
            <IoMdAddCircleOutline />
            <span>Thêm danh mục cấp 1</span>
          </button>
          <button
            onClick={() =>
              setOpenModalCreateCategory({ isParent: false, open: true })
            }
            className="flex w-fit items-center justify-center gap-1 rounded-md bg-blue-500 px-2 py-1.5 text-primary hover:bg-blue-500/80"
          >
            <IoMdAddCircleOutline />
            <span>Thêm danh mục cấp 2</span>
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="p-3">
      <Row gutter={[0, 10]}>
        <Col span={24}>
          <div className="ml-2 py-1 text-3xl font-semibold uppercase text-blue-500">
            Quản lý danh mục
          </div>
        </Col>
        <Col span={24}>
          <Table
            loading={isLoading}
            size="middle"
            title={renderHeader}
            bordered
            columns={columns}
            dataSource={listCategory}
            rowKey={(record) => record._id}
            onChange={handleOnChange}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: total,
              showTotal: (total) => `Số lượng: ${total}`,
            }}
          />
        </Col>
      </Row>
      <ModalCreateCategory
        isLoading={isLoading}
        listCategory={listCategory}
        openModalCreateCategory={openModalCreateCategory}
        setOpenModalCreateCategory={setOpenModalCreateCategory}
        handleCreateCategory={handleCreateCategory}
      />
      <ModalViewCategoryLevel2
        setCategoryEdit={setCategoryEdit}
        isLoading={isLoading}
        listCategoryLevel2={listCategoryLevel2}
        setListCategoryLevel2={setListCategoryLevel2}
        handleDeleteCategory={handleDeleteCategory}
        openModalViewCategoryLevel2={openModalViewCategoryLevel2}
        setOpenModalViewCategoryLevel2={setOpenModalViewCategoryLevel2}
        setOpenModalEditCategory={setOpenModalEditCategory}
      />
      <ModalEditCategory
        setOpenModalViewCategoryLevel2={setOpenModalViewCategoryLevel2}
        isLoading={isLoading}
        categoryEdit={categoryEdit}
        setCategoryEdit={setCategoryEdit}
        listCategory={listCategory}
        openModalEditCategory={openModalEditCategory}
        setOpenModalEditCategory={setOpenModalEditCategory}
        handleUpdateCategory={handleUpdateCategory}
      />
    </div>
  );
};

export default Category;
