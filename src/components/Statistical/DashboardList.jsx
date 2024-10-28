import DashboardCard from "./DashboardCard";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useCountup } from "../../hooks/useCountup";
import { useVNDCountup } from "../../hooks/useCountup";
import { useEffect, useState, useCallback, useRef } from "react";
import {
  getAllCustomerToTime,
  getAllIncomeToTime,
  getAllOrderToTime,
  getAllTableToTime,
} from "../../services/statisticService";
import StatusCodes from "../../utils/StatusCodes";

const DashboardList = () => {
  const time = { today: 0, thisMonth: 0, thisYear: 0, allTime: 0 };
  const [orders, setOrders] = useState(time);
  const [reservations, setReservations] = useState(time);
  const [incomes, setIncomes] = useState(time);
  const [customers, setCustomers] = useState(time);

  const previousOrders = useRef(orders);
  const previousReservations = useRef(reservations);
  const previousIncomes = useRef(incomes);
  const previousCustomers = useRef(customers);

  const fetchAllOrdersToTime = useCallback(async () => {
    try {
      const response = await getAllOrderToTime();
      setOrders(
        response?.EC === StatusCodes.SUCCESS_DAFAULT ? response.DT : time,
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchAllReservationsToTime = useCallback(async () => {
    try {
      const response = await getAllTableToTime();
      setReservations(
        response?.EC === StatusCodes.SUCCESS_DAFAULT ? response.DT : time,
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchAllIncomesToTime = useCallback(async () => {
    try {
      const response = await getAllIncomeToTime();
      setIncomes(
        response?.EC === StatusCodes.SUCCESS_DAFAULT ? response.DT : time,
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchAllCustomersToTime = useCallback(async () => {
    try {
      const response = await getAllCustomerToTime();
      setCustomers(
        response?.EC === StatusCodes.SUCCESS_DAFAULT ? response.DT : time,
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchAllOrdersToTime();
    fetchAllReservationsToTime();
    fetchAllIncomesToTime();
    fetchAllCustomersToTime();
  }, [
    fetchAllOrdersToTime,
    fetchAllReservationsToTime,
    fetchAllIncomesToTime,
    fetchAllCustomersToTime,
  ]);

  const [selectedOrder, setSelectedOrder] = useState({
    key: "allTime",
    value: "Tất cả",
  });
  const [selectedReservation, setSelectedReservation] = useState({
    key: "allTime",
    value: "Tất cả",
  });
  const [selectedIncome, setSelectedIncome] = useState({
    key: "allTime",
    value: "Tất cả",
  });
  const [selectedCustomer, setSelectedCustomer] = useState({
    key: "allTime",
    value: "Tất cả",
  });

  const { countUpRef: ordersCountRef, update: updateOrdersCountRef } =
    useCountup(orders[selectedOrder.key]);
  const { countUpRef: tableOrdersCountRef, update: updateTableOrdersCountRef } =
    useCountup(reservations[selectedReservation.key]);
  const { countUpRef: incomeCountRef, update: updateIncomeCountRef } =
    useVNDCountup(incomes[selectedIncome.key]);
  const {
    countUpRef: newCustomersCountRef,
    update: updateNewCustomersCountRef,
  } = useCountup(customers[selectedCustomer.key]);

  useEffect(() => {
    if (
      previousOrders.current[selectedOrder.key] !== orders[selectedOrder.key]
    ) {
      updateOrdersCountRef(orders[selectedOrder.key]);
      previousOrders.current = orders;
    }
  }, [selectedOrder, orders, updateOrdersCountRef]);

  useEffect(() => {
    if (
      previousReservations.current[selectedReservation.key] !==
      reservations[selectedReservation.key]
    ) {
      updateTableOrdersCountRef(reservations[selectedReservation.key]);
      previousReservations.current = reservations;
    }
  }, [selectedReservation, reservations, updateTableOrdersCountRef]);

  useEffect(() => {
    if (
      previousIncomes.current[selectedIncome.key] !==
      incomes[selectedIncome.key]
    ) {
      updateIncomeCountRef(incomes[selectedIncome.key]);
      previousIncomes.current = incomes;
    }
  }, [selectedIncome, incomes, updateIncomeCountRef]);

  useEffect(() => {
    if (
      previousCustomers.current[selectedCustomer.key] !==
      customers[selectedCustomer.key]
    ) {
      updateNewCustomersCountRef(customers[selectedCustomer.key]);
      previousCustomers.current = customers;
    }
  }, [selectedCustomer, customers, updateNewCustomersCountRef]);

  return (
    <div className="grid grid-cols-4 gap-4">
      <DashboardCard
        title="Đơn đặt bàn"
        value={<span ref={tableOrdersCountRef}></span>}
        change="0"
        isPositive={true}
        icon={<MdOutlineTableRestaurant className="h-6 w-6 text-[#6761D9]" />}
        selected={selectedReservation}
        setSelected={setSelectedReservation}
      />
      <DashboardCard
        title="Đơn đặt đồ ăn"
        value={<span ref={ordersCountRef}></span>}
        change="0"
        isPositive={true}
        icon={<BiFoodMenu className="h-6 w-6 text-[#2C89DB]" />}
        selected={selectedOrder}
        setSelected={setSelectedOrder}
      />
      <DashboardCard
        title="Doanh thu"
        value={<span ref={incomeCountRef}></span>}
        change="0"
        isPositive={true}
        icon={<MdOutlineAttachMoney className="h-6 w-6 text-[#F79F0E]" />}
        selected={selectedIncome}
        setSelected={setSelectedIncome}
      />
      <DashboardCard
        title="Khách hàng"
        value={<span ref={newCustomersCountRef}></span>}
        change="0"
        isPositive={true}
        icon={<FaRegUser className="h-5 w-5 text-[#DE4242]" />}
        selected={selectedCustomer}
        setSelected={setSelectedCustomer}
      />
    </div>
  );
};

export default DashboardList;
