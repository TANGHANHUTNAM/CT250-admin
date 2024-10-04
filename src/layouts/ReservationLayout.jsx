import { useEffect, useState } from "react";
import Detail from "../components/Reservation/Detail";
import Progress from "../components/Reservation/Progress";
import ReservationList from "../components/Reservation/ReservationList";
import { useDynamicTitle } from "../hooks";
import { getReservationsByStatus } from "../services/reservationService";
import StatusCodes from "../utils/StatusCodes";
import { toast } from "react-toastify";

const status = {
  pending: { key: "pending", trans: "Reservation.status.pending" },
  confirmed: { key: "confirmed", trans: "Reservation.status.confirmed" },
  completed: { key: "completed", trans: "Reservation.status.completed" },
  canceled: { key: "canceled", trans: "Reservation.status.canceled" },
};

const ReservationLayout = () => {
  useDynamicTitle("Quản lý đặt bàn");

  const [activeStatus, setActiveStatus] = useState(status.pending.key);
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    setSelectedReservation(null);

    const getReservations = async () => {
      const res = await getReservationsByStatus(activeStatus);

      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        setReservations(res.DT);
      }

      if (res && res.EC === StatusCodes.ERROR_DEFAULT) {
        setReservations([]);
        toast.error(res.EM);
      }
    };

    getReservations();
  }, [activeStatus]);

  return (
    <div className="flex flex-col gap-5 lg:flex-row bg-[#f5f5f5] h-full">
      <div className="flex flex-col gap-5 w-2/5 shrink-0 h-full">
        <Progress
          status={Object.values(status)}
          active={activeStatus}
          setActive={(key) => setActiveStatus(key)}
        />
        <ReservationList
          reservations={reservations}
          selected={selectedReservation}
          setSelected={(item) => setSelectedReservation(item)}
        />
      </div>
      <Detail reservation={selectedReservation} />
    </div>
  );
};

export default ReservationLayout;
