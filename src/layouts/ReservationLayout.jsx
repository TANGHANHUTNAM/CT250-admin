import Detail from "../components/Reservation/Detail";
import Progress from "../components/Reservation/Progress";
import { useDynamicTitle } from "../hooks";

const ReservationLayout = () => {
  useDynamicTitle("Quản lý đặt bàn");
  return (
    <div className="flex flex-col lg:flex-row">
      <Progress />
      <Detail />
    </div>
  );
};

export default ReservationLayout;
