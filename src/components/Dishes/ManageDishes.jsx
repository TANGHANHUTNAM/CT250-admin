import DishList from "./DishList";
import { MdAddCircleOutline, MdSearch } from "react-icons/md";
import { Dropdown, Pagination } from "antd";
import { MdFilterList } from "react-icons/md";
import ModalCreateDish from "./ModalCreateDish";
import { useEffect, useState } from "react";
import ModalEditDish from "./ModalEditDish";
import { getDishesWithPagination } from "../../services/dishService";
import StatusCodes from "../../utils/StatusCodes";
import ModalViewDish from "./ModalViewDish";
const ManageDishes = () => {
  const [openModalCreateDish, setOpenModalCreateDish] = useState(false);
  const [openModalViewDish, setOpenModalViewDish] = useState(false);
  const [openModalEditDish, setOpenModalEditDish] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [listDish, setListDish] = useState([]);
  const [dishDetail, setDishDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDishes();
  }, [page, limit]);

  const fetchDishes = async () => {
    setIsLoading(true);
    let query = `page=${page}&limit=${limit}`;
    try {
      const res = await getDishesWithPagination(query);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        setListDish(res.DT.data);
        setTotal(res.DT.totalData);
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const items2 = [
    {
      key: "1",
      label: "Theo giá tăng dần",
    },
    {
      key: "2",
      label: "Theo giá giảm dần",
    },
    {
      key: "3",
      label: "Món mới nhất",
    },
    {
      key: "4",
      label: "Món cũ nhất",
    },
  ];
  const items1 = [
    {
      key: "3",
      label: "Món chính",
    },
    {
      key: "4",
      label: "Món phụ",
    },
  ];

  return (
    <div className="p-3">
      <div className="mb-3 flex w-full items-center justify-between px-2">
        <div className="flex w-1/2 gap-1.5">
          <Dropdown
            menu={{
              items: items1,
            }}
          >
            <div className="flex h-full w-fit cursor-pointer items-center justify-center gap-1 rounded-md bg-blue-500 px-2 py-2 text-white">
              <MdFilterList className="text-lg" />
              <span className="ml-1">Lọc theo loại</span>
            </div>
          </Dropdown>
          <Dropdown
            menu={{
              items: items2,
            }}
          >
            <div className="flex h-full w-fit cursor-pointer items-center justify-center gap-1 rounded-md bg-blue-500 px-2 py-2 text-white">
              <MdFilterList className="text-lg" />
              <span className="ml-1">Lọc theo thuộc tính</span>
            </div>
          </Dropdown>
        </div>
        <div className="flex w-1/2 justify-end gap-1.5">
          <div className="relative text-black">
            <input
              className="h-full min-w-52 rounded-md border border-blue-500 px-2 outline-none focus:border-blue-600"
              type="text"
              placeholder={`Tìm kiếm món ăn`}
            />
            <button className="absolute right-0 top-0 flex h-full items-center justify-center rounded-md rounded-l-none bg-blue-500 px-1.5 hover:bg-blue-500/90">
              <MdSearch className="text-lg text-white" />
            </button>
          </div>
          <button
            onClick={() => setOpenModalCreateDish(true)}
            className="flex min-w-fit items-center justify-center gap-1 rounded-md bg-blue-500 px-2 py-2 text-white hover:bg-blue-500/90"
          >
            <MdAddCircleOutline className="text-base" />
            <span>Thêm mới</span>
          </button>
        </div>
      </div>
      <DishList
        isLoading={isLoading}
        listDish={listDish}
        setDishDetail={setDishDetail}
        setOpenModalViewDish={setOpenModalViewDish}
        setOpenModalEditDish={setOpenModalEditDish}
      />
      <Pagination
        className={`${listDish && listDish.length > 0 ? "" : "hidden"} my-3`}
        align="end"
        disabled={isLoading}
        pageSize={limit}
        current={page}
        total={total}
        showTotal={(total) => `Số lượng: ${total}`}
        showSizeChanger
        pageSizeOptions={[1, 5, 10, 20]}
        onShowSizeChange={(_, pageSize) => {
          setPage(1);
          setLimit(pageSize);
        }}
        onChange={(page, pageSize) => {
          setPage(page);
          setLimit(pageSize);
        }}
      />
      <ModalCreateDish
        openModalCreateDish={openModalCreateDish}
        setOpenModalCreateDish={setOpenModalCreateDish}
      />
      <ModalViewDish
        dishDetail={dishDetail}
        setDishDetail={setDishDetail}
        openModalViewDish={openModalViewDish}
        setOpenModalViewDish={setOpenModalViewDish}
      />
      <ModalEditDish
        dishDetail={dishDetail}
        setDishDetail={setDishDetail}
        openModalEditDish={openModalEditDish}
        setOpenModalEditDish={setOpenModalEditDish}
      />
    </div>
  );
};

export default ManageDishes;
