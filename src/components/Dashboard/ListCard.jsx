import { useCountup } from "../../hooks/useCountup";
import { useVNDCountup } from "../../hooks/useCountup";
import { LineChart1, LineChart2, LineChart3, BarChart1 } from "./Chart";
const ListCard = () => {
  const ordersCountRef = useCountup(40);
  const tableOrdersCountRef = useCountup(10);
  const incomeCountRef = useVNDCountup(1500000);
  const newCustomersCountRef = useCountup(8);
  return (
    <div className="flex flex-wrap mb-4 text-white">
      {/* Card item */}
      <div className="p-2 w-full sm:w-1/2 lg:w-1/4">
        <div className="bg-[rgb(103,97,217)] flex flex-col rounded-md h-full">
          <div className="p-4 pb-0 flex flex-col gap-1">
            <span
              ref={ordersCountRef}
              className="total text-2xl font-semibold"
            ></span>
            <span className="des text-lg w-full">Đơn hàng hôm nay</span>
          </div>
          <div className="p-4 h-28 flex justify-center">
            <LineChart1 />
          </div>
        </div>
      </div>
      {/* Card item */}
      <div className="p-2 w-full sm:w-1/2 lg:w-1/4">
        <div className="bg-[#2C89DB] flex flex-col rounded-md h-full">
          <div className="p-4 pb-0 flex flex-col gap-1">
            <span
              ref={tableOrdersCountRef}
              className="total text-2xl font-semibold"
            ></span>
            <span className="des text-lg">Đơn đặt bàn hôm nay</span>
          </div>
          <div className="p-4 h-28 flex justify-center">
            <LineChart2 />
          </div>
        </div>
      </div>
      {/* Card item */}
      <div className="p-2 w-full sm:w-1/2 lg:w-1/4">
        <div className="bg-[#F79F0E] flex flex-col rounded-md h-full">
          <div className="p-4 pb-0 flex flex-col gap-1">
            <span
              ref={incomeCountRef}
              className="total text-2xl font-semibold"
            ></span>
            <span className="des text-lg">Thu nhập hôm nay</span>
          </div>
          <div className="p-4 h-28 flex justify-center">
            <LineChart3 />
          </div>
        </div>
      </div>
      {/* Card item */}
      <div className="p-2 w-full sm:w-1/2 lg:w-1/4">
        <div className="bg-[#DE4242] flex flex-col rounded-md h-full">
          <div className="p-4 pb-0 flex flex-col gap-1">
            <span
              ref={newCustomersCountRef}
              className="total text-2xl font-semibold"
            ></span>
            <span className="des text-lg">Khách hàng mới hôm nay</span>
          </div>
          <div className="p-4 h-28 flex justify-center">
            <BarChart1 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
