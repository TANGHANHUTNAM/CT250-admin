import { Dropdown, message } from "antd";
import { MdFilterListAlt } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";

const SearchFilterInput = () => {
  const [listTypeTable, setListTypeTable] = useState([]);
  const [listStatusTable, setListStatusTable] = useState([]);

  const handleFilterTypeTable = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  const handleFilterStatusTable = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  const handleSearch = (e) => {
    console.log(e.target.value);
  };
  const items = [
    {
      label: "1st menu item",
      key: "1",
    },
    {
      label: "2nd menu item",
      key: "2",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];
  return (
    <>
      {/* Filter Type Table */}
      <Dropdown
        menu={{
          items,
          onClick: handleFilterTypeTable,
          selectable: true,
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
          items,
          onClick: handleFilterStatusTable,
          selectable: true,
        }}
      >
        <div className="flex cursor-pointer items-center gap-1 rounded-md bg-blue-500 p-1.5 px-2 text-white">
          <MdFilterListAlt />
          <span>{`Trạng thái`}</span>
        </div>
      </Dropdown>
      <div className="relative">
        <input
          onChange={handleSearch}
          className="h-full w-60 rounded-md border border-blue-500 p-1.5 pl-2 pr-10 outline-none"
          placeholder="Tìm kiếm"
        />
        <div className="absolute right-0 top-0 flex h-full w-fit cursor-pointer items-center justify-center rounded-e-md bg-blue-500 p-2 text-base text-white hover:bg-blue-500/90">
          <IoMdSearch />
        </div>
      </div>
    </>
  );
};

export default SearchFilterInput;
