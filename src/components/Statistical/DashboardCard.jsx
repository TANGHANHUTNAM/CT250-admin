import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const DashboardCard = ({
  title,
  icon,
  value,
  change,
  isPositive,
  background = "bg-white",
  selected,
  setSelected,
}) => {
  const items = [
    {
      label: "Hôm nay",
      key: "today",
    },
    {
      label: "Tháng",
      key: "thisMonth",
    },
    {
      label: "Năm",
      key: "thisYear",
    },
    {
      label: "Tất cả",
      key: "allTime",
    },
  ];
  return (
    <div className={`rounded-lg ${background} p-5 text-gray-900 shadow-md`}>
      <div className="flex items-center justify-between text-2xl font-semibold">
        <span className="text-xl">{value}</span>
        <div className="text-sm">
          <Dropdown
            menu={{
              items,
              onClick: ({ key }) => {
                setSelected({
                  key,
                  value: items.find((item) => item.key === key).label,
                });
              },
            }}
            trigger={["hover"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {selected?.value}
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
