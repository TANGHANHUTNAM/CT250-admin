import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changedPendingReservation } from "../redux/reducer/reservationSlice";
import { toast } from "react-toastify";
import { getReservationsByStatus } from "../services/reservationService";
import StatusCodes from "../utils/StatusCodes";
import { changedPendingContact } from "../redux/reducer/contactSlice";
import { getAllContactsPending } from "../services/contactService";
import {
  changedReservation,
  newCustomer,
} from "../redux/reducer/dashboardSlice";
import { countNewCustomerToday } from "../services/accountService";

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
        dispatch(
          changedReservation({
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

    const getInitialNewCustomer = async () => {
      const res = await countNewCustomerToday();

      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        dispatch(newCustomer({ count: res.DT.count }));
      }
    };

    getInitialReservation();
    getInitialContact();
    getInitialNewCustomer();
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
      dispatch(changedReservation({ total: totalItems, data }));
      if (isNew === true) {
        toast.info("New reservation");
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
  }, []);
};

export default useSSE;
