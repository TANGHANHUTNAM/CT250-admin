import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changedPendingReservation } from "../redux/reducer/reservationSlice";
import { toast } from "react-toastify";
import {
  getNewAndRecentReservation,
  getReservationsByStatus,
} from "../services/reservationService";
import StatusCodes from "../utils/StatusCodes";
import { changedPendingContact } from "../redux/reducer/contactSlice";
import { getAllContactsPending } from "../services/contactService";
import {
  changedIncome,
  changedOrder,
  changedReservation,
  newCustomer,
} from "../redux/reducer/dashboardSlice";
import { countNewCustomerToday } from "../services/accountService";
import {
  calculateIncomesToday,
  getNewAndRecentOrders,
  getOrdersWIthFilter,
} from "../services/orderService";
import { changedPendingOrder } from "../redux/reducer/orderSlice";

const useSSE = () => {
  const dispatch = useDispatch();

  // Gọi api lấy dữ liệu khởi tạo khi render lần đầu
  useEffect(() => {
    const getInitialReservation = async () => {
      const res = await getReservationsByStatus("pending");

      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        dispatch(
          changedPendingReservation({
            total: res.DT.length,
            data: res.DT,
          }),
        );
      }
    };

    const getInitialContact = async () => {
      const res = await getAllContactsPending(1, 5);

      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        dispatch(
          changedPendingContact({
            total: res.DT.totalContacts,
            data: res.DT.data,
          }),
        );
      }
    };

    const getInitialOrder = async () => {
      const res = await getOrdersWIthFilter({
        status: "pending",
        page: 1,
        limit: 6,
      });

      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        dispatch(
          changedPendingOrder({
            total: res.DT.totalData,
            data: res.DT.data,
            totalPages: res.DT.totalPages,
          }),
        );
      }
    };

    const getInitialNewCustomer = async () => {
      const res = await countNewCustomerToday();

      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        dispatch(newCustomer({ count: res.DT.count }));
      }
    };

    const getInitialNewOrder = async () => {
      const res = await getNewAndRecentOrders(6);

      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        dispatch(changedOrder({ count: res.DT.count, data: res.DT.data }));
      }
    };

    const getInitialNewReservation = async () => {
      const res = await getNewAndRecentReservation(6);

      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        dispatch(
          changedReservation({ count: res.DT.count, data: res.DT.data }),
        );
      }
    };

    const getInitialIncomes = async () => {
      const res = await calculateIncomesToday();

      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        dispatch(changedIncome({ income: res.DT.incomes }));
      }
    };

    getInitialReservation();
    getInitialContact();
    getInitialOrder();
    getInitialNewCustomer();
    getInitialNewOrder();
    getInitialNewReservation();
    getInitialIncomes();
  }, []);

  // Lắng nghe SSE events
  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/SSE-Events`,
      { withCredentials: true },
    );

    eventSource.addEventListener("changed-pending-reservation", (event) => {
      const payload = JSON.parse(event.data);
      const { isNew, totalItems, data } = payload;

      dispatch(changedPendingReservation({ total: totalItems, data }));
      if (isNew === true) {
        toast.info("New reservation");
      }
    });

    eventSource.addEventListener("changed-pending-order", (event) => {
      const payload = JSON.parse(event.data);
      const { isNew, data, totalPages, totalData } = payload;

      dispatch(changedPendingOrder({ total: totalData, data, totalPages }));
      if (isNew === true) {
        toast.info("New order");
      }
    });

    eventSource.addEventListener("changed-pending-contact", (event) => {
      const payload = JSON.parse(event.data);
      const { isNew, totalContacts, data } = payload;

      dispatch(changedPendingContact({ total: totalContacts, data }));
      if (isNew === true) {
        toast.info("New reservation");
      }
    });

    eventSource.addEventListener("new-customer", (event) => {
      const payload = JSON.parse(event.data);
      const { count } = payload;

      dispatch(newCustomer({ count }));
    });

    eventSource.addEventListener("new-order", (event) => {
      const payload = JSON.parse(event.data);
      const { count, data } = payload;

      dispatch(changedOrder({ count, data }));
    });

    eventSource.addEventListener("new-reservation", (event) => {
      const payload = JSON.parse(event.data);
      const { count, data } = payload;

      dispatch(changedReservation({ count, data }));
    });

    eventSource.addEventListener("calculate-incomes", (event) => {
      const payload = JSON.parse(event.data);
      const { incomes } = payload;

      dispatch(changedIncome({ income: incomes }));
    });
  }, []);
};

export default useSSE;
