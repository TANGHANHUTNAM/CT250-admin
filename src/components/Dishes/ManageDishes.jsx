import DishList from "./DishList";
import { MdAddCircleOutline, MdSearch } from "react-icons/md";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { Pagination } from "antd";
import { GrPowerReset } from "react-icons/gr";
import ModalCreateDish from "./ModalCreateDish";
import { useCallback, useEffect, useState } from "react";
import ModalEditDish from "./ModalEditDish";
import {
  deleteDish,
  getDishesByFilter,
  setAvailabilityDish,
} from "../../services/dishService";
import StatusCodes from "../../utils/StatusCodes";
import ModalViewDish from "./ModalViewDish";
import { toast } from "react-toastify";
import FilterSort from "./FilterSort";
import { debounce } from "lodash";
import { getAllCagegory } from "../../services/categoryService";
import ModalViewDeletedDish from "./ModalViewDeletedDish";
const ManageDishes = () => {
  const LIMIT = 5;
  const [openModalCreateDish, setOpenModalCreateDish] = useState(false);
  const [openModalViewDish, setOpenModalViewDish] = useState(false);
  const [openModalEditDish, setOpenModalEditDish] = useState(false);
  const [openModalViewDeletedDish, setOpenModalViewDeletedDish] =
    useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(LIMIT);
  const [total, setTotal] = useState(0);
  const [listDish, setListDish] = useState([]);
  const [dishDetail, setDishDetail] = useState(null);
  const [listCategory, setListCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState({
    key: "",
    value: "Chọn danh mục",
  });
  const [filterSortBy, setFilterSortBy] = useState({
    key: "",
    value: "Chọn loại sắp xếp",
  });
  const [filterPrice, setFilterPrice] = useState([]);
  const [filterAvailability, setFilterAvailability] = useState({
    key: "",
    value: "Chọn trạng thái",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchGetAllCategory = async () => {
      try {
        const res = await getAllCagegory();
        if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
          setListCategory(res.DT);
        }
        if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetAllCategory();
  }, []);

  const fetchDishes = async () => {
    setIsLoading(true);
    let query = `page=${page}&limit=${limit}`;
    if (search) query += `&search=${search}`;
    if (filterCategory.key) query += `&category=${filterCategory.key}`;
    if (filterSortBy.key) query += `&sortBy=${filterSortBy.key}`;
    if (filterPrice.length > 0) query += `&price=${filterPrice.join(",")}`;
    if (filterAvailability.key) query += `&available=${filterAvailability.key}`;
    try {
      const res = await getDishesByFilter(query);
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

  const debouncedFetchDishes = useCallback(
    debounce(() => {
      fetchDishes();
    }, 300),
    [
      page,
      limit,
      filterCategory,
      filterSortBy,
      filterPrice,
      filterAvailability,
      search,
    ],
  );

  useEffect(() => {
    debouncedFetchDishes();
    return () => {
      debouncedFetchDishes.cancel();
    };
  }, [debouncedFetchDishes]);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleDeleteDish = async (id) => {
    setIsLoading(true);
    try {
      const res = await deleteDish(id);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        const newTotalDish = total - 1;
        const newTotalPage = Math.ceil(newTotalDish / limit);
        const newPage = Math.max(page > newTotalPage ? newTotalPage : page, 1);
        if (newPage === page) fetchDishes();
        setPage(newPage);
        toast.success("Xóa món ăn thành công");
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error("Xóa món ăn thất bại");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleSetAvailabilityDish = async (id, data) => {
    setIsLoading(true);
    try {
      console.log(data);
      const res = await setAvailabilityDish(id, data);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        fetchDishes();
        toast.success("Cập nhật trạng thái món ăn thành công");
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error("Cập nhật trạng thái món ăn thất bại");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleResetFilter = () => {
    setFilterCategory({ key: "", value: "Chọn danh mục" });
    setFilterSortBy({ key: "", value: "Chọn loại sắp xếp" });
    setFilterAvailability({ key: "", value: "Chọn trạng thái" });
    setFilterPrice([]);
    setSearch("");
    setPage(1);
    setLimit(LIMIT);
  };
  return (
    <div className="p-3">
      <div className="mb-4 p-2 text-3xl font-semibold uppercase text-blue-500">
        Quản lý món ăn
      </div>
      <div className="mb-3 flex w-full items-center justify-between px-2">
        <div className="flex w-1/2 gap-1.5">
          <FilterSort
            listCategory={listCategory}
            setListCategory={setListCategory}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filterSortBy={filterSortBy}
            setFilterSortBy={setFilterSortBy}
            filterPrice={filterPrice}
            setFilterPrice={setFilterPrice}
            filterAvailability={filterAvailability}
            setFilterAvailability={setFilterAvailability}
            setPage={setPage}
          />
        </div>
        <div className="flex w-1/2 justify-end gap-1.5">
          <div className="relative text-black">
            <input
              className="h-full min-w-52 rounded-md border border-blue-500 px-2 outline-none focus:border-blue-600"
              type="text"
              placeholder={`Tìm kiếm món ăn`}
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
            <button
              onClick={() => {
                setPage(1);
                handleSearch(search);
              }}
              className="absolute right-0 top-0 flex h-full items-center justify-center rounded-md rounded-l-none bg-blue-500 px-1.5 hover:bg-blue-500/90"
            >
              <MdSearch className="text-lg text-white" />
            </button>
          </div>
          <button
            onClick={() => handleResetFilter()}
            className="flex min-w-fit items-center justify-center gap-1.5 rounded-md bg-blue-500 px-2 py-2 text-white hover:bg-blue-500/90"
          >
            <GrPowerReset className="text-base" />
            <span>Reset</span>
          </button>
          <button
            onClick={() => setOpenModalViewDeletedDish(true)}
            className="flex min-w-fit items-center justify-center gap-1.5 rounded-md bg-blue-500 px-2 py-2 text-white hover:bg-blue-500/90"
          >
            <MdOutlineDeleteSweep className="text-base" />
            <span>Món đã xóa</span>
          </button>
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
        handleDeleteDish={handleDeleteDish}
        handleSetAvailabilityDish={handleSetAvailabilityDish}
        listDish={listDish}
        setDishDetail={setDishDetail}
        setOpenModalViewDish={setOpenModalViewDish}
        setOpenModalEditDish={setOpenModalEditDish}
      />
      <Pagination
        className={`${listDish && listDish.length > 0 ? "" : "hidden"} mb-2 mt-10`}
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
        listCategory={listCategory}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        fetchDishes={fetchDishes}
      />
      <ModalViewDish
        dishDetail={dishDetail}
        setDishDetail={setDishDetail}
        openModalViewDish={openModalViewDish}
        setOpenModalViewDish={setOpenModalViewDish}
      />
      <ModalEditDish
        setListCategory={setListCategory}
        listCategory={listCategory}
        dishDetail={dishDetail}
        setDishDetail={setDishDetail}
        openModalEditDish={openModalEditDish}
        setOpenModalEditDish={setOpenModalEditDish}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        fetchDishes={fetchDishes}
      />
      <ModalViewDeletedDish
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        fetchDishes={fetchDishes}
        openModalViewDeletedDish={openModalViewDeletedDish}
        setOpenModalViewDeletedDish={setOpenModalViewDeletedDish}
      />
    </div>
  );
};

export default ManageDishes;
