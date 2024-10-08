import { Dropdown } from "antd";
import { MdFilterListAlt } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { useEffect, useState } from "react";

const SearchFilterInput = ({
  setFilterStatusTable,
  setFilterTypeTable,
  filterTypeTable,
  filterStatusTable,
  setCurrentPage,
  handleSearch,
  dataSearch,
  setDataSearch,
}) => {
  const dataTypeTable = [
    {
      _id: "1",
      name: "small",
      capacity: 4,
    },
    {
      _id: "2",
      name: "medium",
      capacity: 6,
    },
    {
      _id: "3",
      name: "large",
      capacity: 8,
    },
  ];

  const dataStatusTable = [
    {
      _id: "1",
      name: "Trống",
    },
    {
      _id: "2",
      name: "Đặt trước",
    },
    {
      _id: "3",
      name: "Đang sử dụng",
    },
  ];

  const [listTypeTable, setListTypeTable] = useState([]);
  const [listStatusTable, setListStatusTable] = useState([]);

  useEffect(() => {
    setListTypeTable(dataTypeTable);
    setListStatusTable(dataStatusTable);
  }, []);

  const handleFilterTypeTable = ({ key }) => {
    setFilterTypeTable(key);
    setCurrentPage(1);
  };
  const handleFilterStatusTable = ({ key }) => {
    setFilterStatusTable(key);
    setCurrentPage(1);
  };

  return (
    <>
      {/* Filter Type Table */}
      <Dropdown
        menu={{
          items: listTypeTable.map((item) => {
            return {
              title: item.name,
              key: item._id,
              label: `${item.name} (${item.capacity})`,
            };
          }),
          onClick: handleFilterTypeTable,
          selectable: true,
          selectedKeys: filterTypeTable,
        }}
      >
        <div className="flex cursor-pointer items-center gap-1 rounded-md bg-blue-500 p-1.5 px-2 text-white">
          <MdFilterListAlt />
          <span>{`Loại bàn`}</span>
        </div>
      </Dropdown>
      {/* Filter Status Table */}
      <Dropdown
        menu={{
          items: listStatusTable.map((item) => {
            return {
              title: item.name,
              key: item._id,
              label: item.name,
            };
          }),
          onClick: handleFilterStatusTable,
          selectable: true,
          selectedKeys: filterStatusTable,
        }}
      >
        <div className="flex cursor-pointer items-center gap-1 rounded-md bg-blue-500 p-1.5 px-2 text-white">
          <MdFilterListAlt />
          <span>{`Trạng thái`}</span>
        </div>
      </Dropdown>
      <div className="relative">
        <input
          onChange={(e) => setDataSearch(e.target.value)}
          className="h-full w-60 rounded-md border border-blue-500 p-1.5 pl-2 pr-10 outline-none"
          placeholder="Tìm kiếm"
          value={dataSearch}
        />
        <div
          onClick={() => handleSearch(dataSearch)}
          className="absolute right-0 top-0 flex h-full w-fit cursor-pointer items-center justify-center rounded-e-md bg-blue-500 p-2 text-base text-white hover:bg-blue-500/90"
        >
          <IoMdSearch />
        </div>
      </div>
    </>
  );
};

export default SearchFilterInput;
