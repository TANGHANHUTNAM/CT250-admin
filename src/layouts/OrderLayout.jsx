import Detail from "../components/Order/Detail";
import Progress from "../components/Order/Progress";

const OrderLayout = () => {
    return (
        <div className="flex flex-col lg:flex-row">
            <Progress />
            <Detail />
        </div>
    )
}

export default OrderLayout;