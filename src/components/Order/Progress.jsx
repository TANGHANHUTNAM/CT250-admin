import OrderItem from "./OrderItem";

const Progress = () => {
    return (
        <div className="basis-12/12 lg:basis-4/12">
            <div className="flex flex-col border-2 border-neutral-400 justify-center items-center p-6 rounded-lg">
                <div className="bg-neutral-200 rounded-r-lg">
                    <button className="bg-violet-700 text-white font-simebold p-2 !px-4 rounded-l-lg">Oder in</button>
                    <button className="p-2 !px-4">Preparing</button>
                    <button className="p-2 !px-">Delivering</button>
                    <button className="p-2 !px-4 !rounded-r-lg">Delivered</button>
                </div>
                <OrderItem />
            </div>
        </div>
    )
}

export default Progress;