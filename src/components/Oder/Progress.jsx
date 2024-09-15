import OderItem from "./OderItem";

const Progress = () => {
    return (
        <div className="basis-4/12">
            <div className="flex flex-col border-2 border-neutral-400 justify-center items-center p-6 rounded-lg">
                <div className="bg-neutral-200 rounded-r-lg">
                    <button className="bg-violet-700 text-white font-simebold p-2 !px-5 rounded-l-lg">Oder in</button>
                    <button className="p-2 !px-5">Preparing</button>
                    <button className="p-2 !px-5">Delivering</button>
                    <button className="p-2 !px-5 !rounded-r-lg">Delivered</button>
                </div>
                <OderItem />
            </div>
        </div>
    )
}

export default Progress;