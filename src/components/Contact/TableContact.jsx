import { Table } from "antd";
const TableContact = ({ columns, data, onChange, pagination }) => {
  return (
    <Table
      size="small"
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={pagination}
      bordered={true}
    />
  );
};

export default TableContact;
