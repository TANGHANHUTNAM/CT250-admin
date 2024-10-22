import { Empty, Pagination } from "antd";
import { formatCurrency } from "../../utils/format";

const OrderList = ({
  orders = [],
  totalPages = 1,
  currentPage = 1,
  handleChangePage = (page) => {},
  selected = {},
  setSelected = (order) => {},
}) => {
  return (
    <div className="w-ful overflow-y-auto bg-white p-3">
      {orders && orders.length > 0 && (
        <div className="space-y-6">
          <div className="divide-y divide-gray-200">
            {orders.map((item, i) => {
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
                      {new Date(item?.orderDate).toLocaleString("vi-VN")}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-700">
                    <div>
                      <p>{item?.receiverName}</p>
                      <p>{item?.receiverPhone}</p>
                    </div>
                    <div className="text-right">
                      <p>x{item?.dishes?.length ?? 1}</p>
                      <p className="text-lg font-semibold text-blue-600">
                        {formatCurrency(item?.orderTotal)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Pagination
            align="end"
            showSizeChanger={false}
            hideOnSinglePage={true}
            total={totalPages * 10}
            current={currentPage}
            onChange={handleChangePage}
          />
        </div>
      )}

      {orders && orders.length === 0 && (
        <div className="flex h-full w-full items-center justify-center">
          <Empty />
        </div>
      )}
    </div>
  );
};

export default OrderList;
