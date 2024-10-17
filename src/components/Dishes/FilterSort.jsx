import { Checkbox, Dropdown } from "antd";
import { MdFilterList } from "react-icons/md";

const FilterSort = ({
  filterCategory,
  setFilterCategory,
  filterSortBy,
  setFilterSortBy,
  filterPrice,
  setFilterPrice,
  filterAvailability,
  setFilterAvailability,
  setPage,
  listCategory,
}) => {
  const sortBy = [
    {
      key: "a-z",
      label: "A->Z",
    },
    {
      key: "z-a",
      label: "Z->A",
    },
    {
      key: "asc-price",
      label: "Giá tăng dần",
    },
    {
      key: "desc-price",
      label: "Giá giảm dần",
    },
    {
      key: "new",
      label: "Món mới nhất",
    },
    {
      key: "old",
      label: "Món cũ nhất",
    },
  ];

  const defaultOptionsPrice = [
    {
      value: "<100000",
      label: "Dưới 100.000VND",
    },
    {
      value: "100000-200000",
      label: "100.000VNĐ - 200.000VNĐ",
    },
    {
      value: "200000-500000",
      label: "200.000VNĐ - 500.000VNĐ",
    },
    {
      value: "500000-1000000",
      label: "500.000VNĐ - 1.000.000VNĐ",
    },
    {
      value: ">1000000",
      label: "Trên 1.000.000VNĐ",
    },
  ];

  const Availability = [
    {
      key: "available",
      label: "Còn hàng",
    },
    {
      key: "unavailable",
      label: "Hết hàng",
    },
  ];
  return (
    <>
      {/* Filter Category */}
      <Dropdown
        menu={{
          items: listCategory.map((item) => ({
            title: item.name,
            key: item._id,
            label: item.name,
          })),
          onClick: ({ key }) => {
            const value = listCategory.find((item) => item._id === key).name;
            setPage(1);
            setFilterCategory({ key, value: value });
          },
          selectable: true,
          selectedKeys: filterCategory.key,
        }}
      >
        <div className="flex h-full min-w-36 cursor-pointer items-center justify-start gap-1 rounded-md bg-blue-500 px-3 py-2 text-white">
          <MdFilterList className="text-lg" />
          <span className="ml-1">{filterCategory?.value}</span>
        </div>
      </Dropdown>
      {/* SortBy */}
      <Dropdown
        menu={{
          items: sortBy,
          onClick: ({ key }) => {
            const value = sortBy.find((item) => item.key === key).label;
            setFilterSortBy({ key, value: value });
            setPage(1);
          },
          selectable: true,
          selectedKeys: filterSortBy.key,
        }}
      >
        <div className="flex h-full min-w-40 cursor-pointer items-center justify-start gap-1 rounded-md bg-blue-500 px-3 py-2 text-white">
          <MdFilterList className="text-lg" />
          <span className="ml-1">{filterSortBy?.value}</span>
        </div>
      </Dropdown>
      {/* Price */}
      <Dropdown
        menu={{
          items: [
            {
              key: "1",
              label: (
                <Checkbox.Group
                  value={filterPrice}
                  options={defaultOptionsPrice}
                  onChange={(value) => {
                    setPage(1);
                    setFilterPrice(value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                />
              ),
            },
          ],
        }}
      >
        <div className="flex h-full min-w-fit cursor-pointer items-center justify-start gap-1 rounded-md bg-blue-500 px-3 py-2 text-white">
          <MdFilterList className="text-lg" />
          <span className="ml-1">Chọn mức giá</span>
        </div>
      </Dropdown>
      {/* Availability */}
      <Dropdown
        menu={{
          items: Availability,
          onClick: ({ key }) => {
            const value = Availability.find((item) => item.key === key).label;
            setFilterAvailability({ key, value: value });
            setPage(1);
          },
          selectable: true,
          selectedKeys: filterAvailability.key,
        }}
      >
        <div className="flex h-full min-w-28 cursor-pointer items-center justify-start gap-1 rounded-md bg-blue-500 px-3 py-2 text-white">
          <MdFilterList className="text-lg" />
          <span className="ml-1">{filterAvailability?.value}</span>
        </div>
      </Dropdown>
    </>
  );
};

export default FilterSort;
