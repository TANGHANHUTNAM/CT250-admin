import { Empty } from "antd";

const ReservationList = ({
  reservations = [],
  selected = {},
  setSelected = (item) => {},
}) => {
  return (
    <div className="h-full max-h-[76.8vh] w-full divide-y divide-gray-200 overflow-y-auto rounded-sm bg-white p-3">
      {reservations.length > 0 &&
        reservations.map((item, i) => {
          return (
            <div
              key={`${i}-${item?._id}`}
              className={`w-full cursor-pointer space-y-2 px-3 py-4 hover:bg-blue-50 ${
                selected?._id === item?._id ? "bg-blue-50" : ""
              }`}
              onClick={() => setSelected(item)}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`text-base font-medium ${
                    selected?._id === item?._id ? "text-blue-600" : ""
                  }`}
                >
                  <span className="text-blue-600">#</span>
                  {item?._id}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(item?.createdAt).toLocaleString("vi-VN")}
                </div>
              </div>
              <div className="flex items-start justify-between text-sm text-gray-700">
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
        <div className="flex h-full w-full items-center justify-center">
          <Empty />
        </div>
      )}
    </div>
  );
};

export default ReservationList;
