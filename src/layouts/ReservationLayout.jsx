import { useEffect, useState } from "react";
import Detail from "../components/Reservation/Detail";
import Progress from "../components/Reservation/Progress";
import ReservationList from "../components/Reservation/ReservationList";
import { useDynamicTitle } from "../hooks";
import { getReservationsByStatus } from "../services/reservationService";
import StatusCodes from "../utils/StatusCodes";
import { toast } from "react-toastify";
import HandleReservationModal from "../components/Reservation/HandleReservationModal";
import { useSelector } from "react-redux";

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
  const [open, setOpen] = useState(false);

  const pendingReservationFromRedux = useSelector(
    (state) => state.reservation.data,
  );

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

  useEffect(() => {
    setSelectedReservation(null);
    getReservations();
  }, [activeStatus]);

  useEffect(() => {
    if (activeStatus === status.pending.key) {
      setReservations(pendingReservationFromRedux);
    }
  }, [pendingReservationFromRedux]);

  const handleComplete = async (completeFunc = async () => {}) => {
    const res = await completeFunc(selectedReservation?._id);
    console.log(res);

    if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
      toast.success(res.EM);
      getReservations();
      setSelectedReservation(null);
    }

    if (res && res.EC === StatusCodes.ERROR_DEFAULT) {
      toast.error(res.EM);
    }
  };

  return (
    <div className="flex h-full flex-col gap-5 bg-[#f5f5f5] lg:flex-row">
      <div className="flex h-full w-2/5 shrink-0 flex-col gap-5">
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
      <Detail
        reservation={selectedReservation}
        setOpen={setOpen}
        handleComplete={handleComplete}
      />
      <HandleReservationModal
        open={open}
        setOpen={setOpen}
        data={selectedReservation}
        getReservations={getReservations}
        setSelectedReservation={setSelectedReservation}
      />
    </div>
  );
};

export default ReservationLayout;
