import { Checkbox, Col, Dropdown, Menu, Row, Table } from "antd";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { useState } from "react";
import SearchFilterInput from "./SearchFilterInput";
import { GrPowerReset } from "react-icons/gr";
import ModalCreateTable from "./ModalCreateTable";
import ModalCreateTypeTable from "./ModalCreateTypeTable";
import ModalEditTable from "./ModalEditTable";
import ModalViewTypeTable from "./ModalViewTypeTable";

const ManageTable = () => {
  const [openModalCreateTable, setOpenModalCreateTable] = useState(false);
  const [openModalCreateTypeTable, setOpenModalCreateTypeTable] =
    useState(false);
  const [openModalEditTable, setOpenModalEditTable] = useState(false);
  const [openModalViewTypeTable, setOpenModalViewTypeTable] = useState(false);
  const columns = [
    {
      title: "Column 1",
      dataIndex: "address",
      key: "1",
    },
    {
      title: "Column 2",
      dataIndex: "address",
      key: "2",
    },
    {
      title: "Column 3",
      dataIndex: "address",
      key: "3",
    },
    {
      title: "Column 4",
      dataIndex: "address",
      key: "4",
    },
    {
      title: "Column 5",
      dataIndex: "address",
      key: "5",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 40,
      address: "London Park",
    },
    {
      key: "3",
      name: "Jim Green",
      age: 40,
      address: "London Park",
    },
    {
      key: "4",
      name: "Jim Green",
      age: 40,
      address: "London Park",
    },
    {
      key: "5",
      name: "Jim Green",
      age: 40,
      address: "London Park",
    },
    {
      key: "6",
      name: "Jim Green",
      age: 40,
      address: "London Park",
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
          <SearchFilterInput />
        </div>
        {/* Button */}
        <div className="flex space-x-1.5">
          <button
            onClick={() => setOpenModalCreateTable(true)}
            className="flex w-fit items-center justify-center gap-1 rounded-md bg-blue-500 px-2 py-1.5 text-primary hover:bg-blue-400"
          >
            <IoMdAddCircleOutline />
            <span>Thêm bàn</span>
          </button>
          <button
            onClick={() => setOpenModalCreateTypeTable(true)}
            className="flex w-fit items-center justify-center gap-1 rounded-md bg-yellow-500 px-2 py-1.5 text-primary hover:bg-yellow-400"
          >
            <MdOutlineBookmarkAdd />
            <span>Thêm loại bàn</span>
          </button>
          <button
            onClick={() => setOpenModalViewTypeTable(true)}
            className="flex w-fit items-center justify-center gap-1 rounded-md bg-red-500 px-2 py-1.5 text-primary hover:bg-red-400"
          >
            <MdOutlineRemoveRedEye />
            <span>Xem loại bàn</span>
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="p-3">
      <Row gutter={[0, 10]}>
        <Col span={12}>
          <div className="ml-2 py-1 text-3xl font-semibold uppercase text-blue-600">
            Quản lý bàn
          </div>
        </Col>
        <Col span={12}>
          <div className="flex justify-end pr-2">
            <button className="flex items-center justify-center gap-1 rounded-md bg-blue-500 p-2 text-white hover:bg-blue-500/90">
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
            dataSource={data}
          />
        </Col>
      </Row>
      <ModalCreateTable
        openModalCreateTable={openModalCreateTable}
        setOpenModalCreateTable={setOpenModalCreateTable}
      />
      <ModalCreateTypeTable
        openModalCreateTypeTable={openModalCreateTypeTable}
        setOpenModalCreateTypeTable={setOpenModalCreateTypeTable}
      />
      <ModalEditTable
        openModalEditTable={openModalEditTable}
        setOpenModalEditTable={setOpenModalEditTable}
      />
      <ModalViewTypeTable
        openModalViewTypeTable={openModalViewTypeTable}
        setOpenModalViewTypeTable={setOpenModalViewTypeTable}
      />
    </div>
  );
};

export default ManageTable;
