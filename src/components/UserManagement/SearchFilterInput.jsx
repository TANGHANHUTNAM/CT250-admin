import { Dropdown } from "antd";
import { MdFilterListAlt } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { useEffect, useState } from "react";

const SearchFilterInput = ({
  setFilterRole,
  filterRole,
  setCurrentPage,
  handleSearch,
  dataSearch,
  setDataSearch,
}) => {
  const dataRole = [
    {
      _id: "1",
      name: "Khách hàng",
    },
    {
      _id: "2",
      name: "Nhân viên",
    },
    {
      _id: "3",
      name: "Admin",
    },
  ];

  const [ListRole, setListRole] = useState([]);

  useEffect(() => {
    setListRole(dataRole);
  }, []);

  const handlefilterRole = ({ key }) => {
    const label = ListRole.find((item) => item._id === key).name;
    setFilterRole({ key, value: label });
    setCurrentPage(1);
  };

  return (
    <>
      {/* Filter Type Table */}
      <Dropdown
        menu={{
          items: ListRole.map((item) => {
            return {
              title: item.name,
              key: item._id,
              label: item.name,
            };
          }),
          onClick: handlefilterRole,
          selectable: true,
          selectedKeys: filterRole.key,
        }}
      >
        <div className="flex cursor-pointer items-center gap-1 rounded-md bg-blue-500 p-1.5 px-2 text-white">
          <MdFilterListAlt />
          <span>{filterRole.value}</span>
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
