import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { newOrConfirmedReservation } from "../redux/reducer/reservationSlice";
import { toast } from "react-toastify";
import { getPendingReservationsWithPagination } from "../services/reservationService";
import StatusCodes from "../utils/StatusCodes";

const useNotifications = () => {
  const dispatch = useDispatch();

  // Gọi api lấy dữ liệu khởi tạo khi render lần đầu
  useEffect(() => {
    const getInitialData = async () => {
      const res = await getPendingReservationsWithPagination(1, 3);

      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        dispatch(
          newOrConfirmedReservation({
            total: res.DT.totalItems,
            data: res.DT.data,
          })
        );
      }
    };

    getInitialData();
  }, []);

  // Lắng nghe SSE events
  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/SSE-Events`,
      { withCredentials: true }
    );

    eventSource.addEventListener("new-or-confirmed-reservation", (event) => {
      const payload = JSON.parse(event.data);
      const { isNew, totalItems, data } = payload;

      dispatch(newOrConfirmedReservation({ total: totalItems, data }));
      if (isNew === true) {
        toast.info("New reservation");
      }
    });
  }, []);
};

export default useNotifications;
