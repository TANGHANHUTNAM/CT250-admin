import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changedPendingReservation } from "../redux/reducer/reservationSlice";
import { toast } from "react-toastify";
import { getPendingReservationsWithPagination } from "../services/reservationService";
import StatusCodes from "../utils/StatusCodes";
import { changedPendingContact } from "../redux/reducer/contactSlice";
import { getAllContactsPending } from "../services/contactService";

const useNotifications = () => {
  const dispatch = useDispatch();

  // Gọi api lấy dữ liệu khởi tạo khi render lần đầu
  useEffect(() => {
    const getInitialReservation = async () => {
      const res = await getPendingReservationsWithPagination(1, 6);

      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        dispatch(
          changedPendingReservation({
            total: res.DT.totalItems,
            data: res.DT.data,
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

    getInitialReservation();
    getInitialContact();
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

    eventSource.addEventListener("changed-pending-contact", (event) => {
      const payload = JSON.parse(event.data);
      const { isNew, totalContacts, data } = payload;

      dispatch(changedPendingContact({ total: totalContacts, data }));
      if (isNew === true) {
        toast.info("New reservation");
      }
    });
  }, []);
};

export default useNotifications;
