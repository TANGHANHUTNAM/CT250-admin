import { useTranslation } from "react-i18next";
import ReservationItem from "./ReservationItem";

const Progress = () => {
  const { t } = useTranslation();

  return (
    <div className="basis-12/12 lg:basis-4/12">
      <div className="flex flex-col border-2 border-neutral-400 justify-center items-center p-6 rounded-lg">
        <div className="bg-neutral-200 rounded-r-lg">
          <button className="bg-violet-700 text-white font-simebold p-2 !px-4 rounded-l-lg">
            {t("Reservation.status.status1")}
          </button>
          <button className="p-2 !px-4">
            {" "}
            {t("Reservation.status.status2")}
          </button>
          <button className="p-2 !px-4 !rounded-r-lg">
            {" "}
            {t("Reservation.status.status3")}
          </button>
        </div>
        <ReservationItem />
      </div>
    </div>
  );
};

export default Progress;
