import Detail from "../components/Oder/Detail";
import Progress from "../components/Oder/Progress";

const OderLayout = () => {
    return (
        <div className="flex flex-row">
            <Progress />
            <Detail />
        </div>
    )
}

export default OderLayout;