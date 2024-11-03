import { Dropdown } from "antd";
import { MdFilterListAlt } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";

const SearchFilterInput = ({
  search,
  setSearch,
  handleSearch,
  filterStatusNews,
  setFilterStatusNews,
  sortBy,
  setSortBy,
  setCurrentPage,
}) => {
  const dataStatusCoupon = [
    {
      key: "published",
      label: "Đang đăng bài",
      title: "Đang đăng bài",
    },
    {
      key: "unpublished",
      label: "Chưa đăng bài",
      title: "Chưa đăng bài",
    },
  ];
  const dataSortBy = [
    {
      key: "new",
      label: "Mới nhất",
      title: "Mới nhất",
    },
    {
      key: "old",
      label: "Cũ nhất",
      title: "Cũ nhất",
    },
  ];

  return (
    <>
      {/* Filter Status Coupon */}
      <Dropdown
        menu={{
          items: dataStatusCoupon,
          onClick: ({ key }) => {
            const label = dataStatusCoupon.find(
              (item) => item.key === key,
            ).label;
            setFilterStatusNews({
              key,
              value: label,
            });
            setCurrentPage(1);
          },
          selectable: true,
          selectedKeys: filterStatusNews.key,
        }}
      >
        <div className="flex min-w-[132px] cursor-pointer items-center gap-1 rounded-md bg-blue-500 p-1.5 px-2 text-white">
          <MdFilterListAlt />
          <span>{filterStatusNews.value}</span>
        </div>
      </Dropdown>
      {/* Sort */}
      <Dropdown
        menu={{
          items: dataSortBy,
          onClick: ({ key }) => {
            const label = dataSortBy.find((item) => item.key === key).label;
            setSortBy({
              key,
              value: label,
            });
            setCurrentPage(1);
          },
          selectable: true,
          selectedKeys: sortBy.key,
        }}
      >
        <div className="flex min-w-[120px] cursor-pointer items-center gap-1 rounded-md bg-blue-500 p-1.5 px-2 text-white">
          <MdFilterListAlt />
          <span>{sortBy.value}</span>
        </div>
      </Dropdown>
      <div className="relative">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="h-full w-60 rounded-md border border-blue-500 p-1.5 pl-2 pr-10 outline-none"
          placeholder="Tìm kiếm"
          value={search}
        />
        <div
          onClick={() => handleSearch(search)}
          className="absolute right-0 top-0 flex h-full w-fit cursor-pointer items-center justify-center rounded-e-md bg-blue-500 p-2 text-base text-white hover:bg-blue-500/90"
        >
          <IoMdSearch />
        </div>
      </div>
    </>
  );
};

export default SearchFilterInput;
