import { Dropdown } from "antd";
import { MdFilterListAlt } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { useEffect, useState } from "react";

const SearchFilterInput = ({
  search,
  setSearch,
  handleSearch,
  filterTypeCoupon,
  setFilterTypeCoupon,
  filterStatusCoupon,
  setFilterStatusCoupon,
  sortBy,
  setSortBy,
  setCurrentPage,
}) => {
  const dataTypeCoupon = [
    {
      key: "fixed",
      label: "Theo giá trị",
      title: "Theo giá trị",
    },
    {
      key: "percentage",
      label: "Theo phần trăm",
      title: "Theo phần trăm",
    },
  ];

  const dataStatusCoupon = [
    {
      key: "active",
      label: "Đang kích hoạt",
      title: "Đang kích hoạt",
    },
    {
      key: "inactive",
      label: "Không kích hoạt",
      title: "Không kích hoạt",
    },
  ];
  // min_price_asc, min_price_desc, latest_start_date, farthest_start_date, latest_end_date, farthest_end_date
  const dataSortBy = [
    {
      key: "min_price_asc",
      label: "Giá áp dụng tăng dần",
      title: "Giá áp dụng tăng dần",
    },
    {
      key: "min_price_desc",
      label: "Giá áp dụng giảm dần",
      title: "Giá áp dụng giảm dần",
    },
    {
      key: "latest_start_date",
      label: "Ngày bắt đầu gần nhất",
      title: "Ngày bắt đầu gần nhất",
    },
    {
      key: "farthest_start_date",
      label: "Ngày bắt đầu xa nhất",
      title: "Ngày bắt đầu xa nhất",
    },
    {
      key: "latest_end_date",
      label: "Ngày kết thúc gần nhất",
      title: "Ngày kết thúc gần nhất",
    },
    {
      key: "farthest_end_date",
      label: "Ngày kết thúc xa nhất",
      title: "Ngày kết thúc xa nhất",
    },
  ];

  return (
    <>
      {/* Filter Type Coupon */}
      <Dropdown
        menu={{
          items: dataTypeCoupon,
          onClick: ({ key }) => {
            const label = dataTypeCoupon.find((item) => item.key === key).label;
            setFilterTypeCoupon({
              key,
              value: label,
            });
            setCurrentPage(1);
          },
          selectable: true,
          selectedKeys: filterTypeCoupon.key,
        }}
      >
        <div className="flex cursor-pointer items-center gap-1 rounded-md bg-blue-500 p-1.5 px-2 text-white">
          <MdFilterListAlt />
          <span>{filterTypeCoupon.value}</span>
        </div>
      </Dropdown>
      {/* Filter Status Coupon */}
      <Dropdown
        menu={{
          items: dataStatusCoupon,
          onClick: ({ key }) => {
            const label = dataStatusCoupon.find(
              (item) => item.key === key,
            ).label;
            setFilterStatusCoupon({
              key,
              value: label,
            });
            setCurrentPage(1);
          },
          selectable: true,
          selectedKeys: filterStatusCoupon.key,
        }}
      >
        <div className="flex cursor-pointer items-center gap-1 rounded-md bg-blue-500 p-1.5 px-2 text-white">
          <MdFilterListAlt />
          <span>{filterStatusCoupon.value}</span>
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
        <div className="flex cursor-pointer items-center gap-1 rounded-md bg-blue-500 p-1.5 px-2 text-white">
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
