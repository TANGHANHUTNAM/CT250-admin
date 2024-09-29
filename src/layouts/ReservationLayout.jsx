import Detail from "../components/Reservation/Detail";
import Progress from "../components/Reservation/Progress";

const ReservationLayout = () => {
    return (
        <div className="flex flex-col lg:flex-row">
            <Progress />
            <Detail />
        </div>
    )
}

export default ReservationLayout;