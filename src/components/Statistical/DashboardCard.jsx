import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const DashboardCard = ({
  title,
  icon,
  value,
  change,
  isPositive,
  background = "bg-white",
}) => {
  const items = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];
  return (
    <div className={`rounded-lg ${background} p-6 text-gray-900 shadow-lg`}>
      <div className="flex items-center justify-between text-2xl font-semibold">
        <span>{value}</span>
        <div className="text-sm">
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Click me
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
      <div
        className={`text-sm font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}
      >
        {isPositive ? "+" : ""}
        {change}%
      </div>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-lg">{title}</span>
        <span>{icon}</span>
      </div>
    </div>
  );
};
export default DashboardCard;
