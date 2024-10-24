import DashboardCard from "./DashboardCard";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useCountup } from "../../hooks/useCountup";
import { useVNDCountup } from "../../hooks/useCountup";
import { useState } from "react";
const DashboardList = () => {
  // const [orders, setOrders] = useState(order);
  // const [reservations, setReservations] = useState(reservation);
  // const [incomes, setIncomes] = useState(income);
  // const [customers, setCustomers] = useState(customer);
  const reservation = {
    today: 10,
    thisWeek: 70,
    thisMonth: 300,
  };
  const order = {
    today: 20,
    thisWeek: 140,
    thisMonth: 600,
  };
  const income = {
    today: 1000000,
    thisWeek: 7000000,
    thisMonth: 30000000,
  };
  const customer = {
    today: 4,
    thisWeek: 24,
    thisMonth: 100,
  };

  const { countUpRef: ordersCountRef } = useCountup(order.today);
  const { countUpRef: tableOrdersCountRef } = useCountup(reservation.today);
  const incomeCountRef = useVNDCountup(income.today);
  const { countUpRef: newCustomersCountRef } = useCountup(customer.today);
  return (
    <div className="grid grid-cols-4 gap-4">
      <DashboardCard
        title="Đơn đặt bàn"
        value={<span ref={tableOrdersCountRef}></span>}
        change="5.2"
        isPositive={true}
        icon={<MdOutlineTableRestaurant className="h-6 w-6 text-[#6761D9]" />}
      />
      <DashboardCard
        title="Đơn đặt đồ ăn"
        value={<span ref={ordersCountRef}></span>}
        change="3.1"
        isPositive={true}
        icon={<BiFoodMenu className="h-6 w-6 text-[#2C89DB]" />}
      />
      <DashboardCard
        title="Doanh thu"
        value={<span ref={incomeCountRef}></span>}
        change="-2.4"
        isPositive={false}
        icon={<MdOutlineAttachMoney className="h-6 w-6 text-[#F79F0E]" />}
      />
      <DashboardCard
        title="Khách hàng mới"
        value={<span ref={newCustomersCountRef}></span>}
        change="4.7"
        isPositive={true}
        icon={<FaRegUser className="h-5 w-5 text-[#DE4242]" />}
      />
    </div>
  );
};

export default DashboardList;
