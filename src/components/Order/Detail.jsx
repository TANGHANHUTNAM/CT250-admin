import { TiLocationOutline } from "react-icons/ti";
import OrderMenu from "./OrderMenu";

const Detail = () => {
    return (
        <div className="basis-12/12 lg:basis-8/12 bg-gray ml-8">
            <div className="text-xl font-semibold mb-4">Order Details</div>
            <div className="border-2 border-neutral-400 rounded-lg">
                <div className="py-8 px-6">
                    <div className="border-b border-neutral-400 pb-6">
                        <div className="text-lg font-medium mb-1">
                            Order #1
                        </div>
                        <div className="text-md text-neutral-500">
                            June 1, 2020, 08:22 AM
                        </div>
                    </div>
                    <div className="border-b border-neutral-400 pb-6">
                        <div className="flex my-3">
                            <div className="basis-7/12 mr-12">
                                <div className="text-md text-neutral-500">Delivery Address</div>
                                <div className="flex items-center">
                                    <TiLocationOutline className="text-2xl mr-1 text-violet-700" />
                                    <div className="text-lg font-semibold">
                                        Elm Street, 23
                                    </div>
                                </div>
                            </div>
                            <div className="basis-3/12">
                                <div className="text-md text-neutral-500 mb-1">Estimation Time</div>
                                <div className="text-md font-semibold">10 Min</div>
                            </div>
                            <div className="basis-3/12">
                                <div className="text-md text-neutral-500 mb-1">Payment</div>
                                <div className="text-md font-semibold">Paypal</div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="basis-6/12 mr-12 text-md text-neutral-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, maiores pariatur nisi odit laboriosam officiis quo quasi sed autem.</div>
                        </div>
                    </div>
                    <div>
                        <OrderMenu />
                    </div>
                </div>
                <div></div>
            </div>
            <div className="flex justify-end mt-6">
                <button className="border-2 border-violet-700 text-violet-700 p-3 rounded-lg px-6 mr-5 font-semibold">Reject Order</button>
                <button className="bg-violet-700 text-white p-3 rounded-lg px-6 font-semibold">Accept Order</button>
            </div>
        </div>
    )
}

export default Detail;