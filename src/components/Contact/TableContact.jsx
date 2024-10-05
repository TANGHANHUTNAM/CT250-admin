import { Table } from "antd";
const TableContact = ({
  columns,
  data,
  onChange,
  pagination,
  rowKey,
  loading,
}) => {
  return (
    <Table
      size="small"
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={pagination}
      bordered={true}
      rowKey={rowKey}
      loading={loading}
    />
  );
};

export default TableContact;
