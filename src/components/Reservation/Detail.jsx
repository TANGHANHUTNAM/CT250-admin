import { TiLocationOutline } from "react-icons/ti";

const Detail = () => {
    return (
        <div className="basis-12/12 lg:basis-8/12 bg-gray ml-8">
            <div className="text-xl font-semibold mb-4">Reservation Details</div>
            <div className="border-2 border-neutral-400 rounded-lg">
                <div className="py-8 px-6">
                    <div className="border-b border-neutral-400 pb-6">
                        <div className="text-lg font-medium mb-1">
                            Reser #1
                        </div>
                        <div className="text-md text-neutral-500">
                            June 1, 2020, 08:22 AM
                        </div>
                    </div>
                    <div className="border-b border-neutral-400 pb-6">
                        <div className="flex my-3">
                            <div className="basis-4/12 mr-12">
                                <div className="text-md text-neutral-500">Information</div>
                                <div className="flex flex-col">
                                    <div className="text-md font-semibold">Elsa Carmic</div>
                                    <div className="text-md font-semibold">0123 345 67</div>
                                    <div className="text-md font-semibold">elsacarmic@gmail.com</div>
                                </div>
                            </div>
                            <div className="basis-3/12">
                                <div className="text-md text-neutral-500 mb-1">Quantity</div>
                                <div className="text-md font-semibold">10 people</div>
                            </div>
                            <div className="basis-3/12">
                                <div className="text-md text-neutral-500 mb-1">Date</div>
                                <div className="text-md font-semibold">June 2, 2020<br/>08:22 AM</div>
                            </div>
                            <div className="basis-3/12">
                                <div className="text-md text-neutral-500 mb-1">Note</div>
                                <div className="text-md font-semibold">Inside</div>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
                <div></div>
            </div>
            <div className="flex justify-end mt-6">
                <button className="border-2 border-violet-700 text-violet-700 p-3 rounded-lg px-6 mr-5 font-semibold">Reject reservation</button>
                <button className="bg-violet-700 text-white p-3 rounded-lg px-6 font-semibold">Accept reservation</button>
            </div>
        </div>
    )
}

export default Detail;