import { Table } from "antd";
const TableContact = ({ columns, data, onChange }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={{ current: 1, pageSize: 7 }}
    />
  );
};

export default TableContact;
