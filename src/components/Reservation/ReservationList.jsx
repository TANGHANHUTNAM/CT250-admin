import { Empty } from "antd";

const ReservationList = ({
  reservations = [],
  selected = {},
  setSelected = (item) => {},
}) => {
  return (
    <div className="w-full h-full max-h-[76.8vh] overflow-y-auto bg-white rounded-sm p-3 divide-y divide-gray-200">
      {reservations.length > 0 &&
        reservations.map((item, i) => {
          return (
            <div
              key={`${i}-${item?._id}`}
              className={`px-3 py-4 w-full space-y-2 cursor-pointer hover:bg-violet-50 ${
                selected?._id === item?._id ? "bg-violet-100" : ""
              }`}
              onClick={() => setSelected(item)}
            >
              <div className="flex justify-between items-center">
                <div
                  className={`text-base font-medium ${
                    selected?._id === item?._id ? "text-violet-700" : ""
                  }`}
                >
                  <span className="text-violet-700">#</span>
                  {item?._id}
                </div>
                <div className="text-gray-500 text-sm">
                  {new Date(item?.createdAt).toLocaleString("vi-VN")}
                </div>
              </div>
              <div className="flex justify-between items-start text-sm text-gray-700">
                <div>
                  <p>{item?.customerName}</p>
                  <p>{item?.customerEmail}</p>
                </div>
                <p>{item?.customerPhone}</p>
              </div>
            </div>
          );
        })}

      {reservations.length === 0 && (
        <div className="w-full h-full flex justify-center items-center">
          <Empty />
        </div>
      )}
    </div>
  );
};

export default ReservationList;
