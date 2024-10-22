import { useCallback, useEffect, useState } from "react";
import Detail from "../components/Order/Detail";
import Progress from "../components/Order/Progress";
import { useDynamicTitle } from "../hooks";
import OrderList from "../components/Order/OrderList";
import { FaSearch } from "react-icons/fa";
import { getOrdersWIthFilter } from "../services/orderService";
import StatusCodes from "../utils/StatusCodes";
import { toast } from "react-toastify";
import _ from "lodash";

const status = {
  pending: { key: "pending", trans: "Order.status.status1" },
  preparing: { key: "preparing", trans: "Order.status.status2" },
  shipping: { key: "shipping", trans: "Order.status.status3" },
  completed: { key: "completed", trans: "Order.status.status4" },
  canceled: { key: "canceled", trans: "Order.status.status5" },
};

const PAGE_LIMIT = 6;

const OrderLayout = () => {
  useDynamicTitle("Quản lý đơn hàng");

  const [activeStatus, setActiveStatus] = useState(status.pending.key);
  const [orders, setOrders] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getOrders = async (status, search, page, limit) => {
    const res = await getOrdersWIthFilter({
      status,
      search,
      page,
      limit,
    });

    if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
      setOrders(res.DT);
    }

    if (res && res.EC === StatusCodes.ERROR_DEFAULT) {
      setOrders(null);
      toast.error(res.EM);
    }
  };

  const handleSearch = useCallback(_.debounce(getOrders, 300), []);

  useEffect(() => {
    setSelectedOrder(null);
    if (searchKey) {
      handleSearch(activeStatus, searchKey, currentPage, PAGE_LIMIT);
    } else {
      getOrders(activeStatus, searchKey, currentPage, PAGE_LIMIT);
    }
  }, [currentPage, activeStatus, searchKey]);

  const handleChangeTab = (key) => {
    setActiveStatus(key);
    setSearchKey("");
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#f5f5f5]" style={{ minHeight: "calc(100vh - 84px)" }}>
      <div className="space-y-5 pt-5">
        <Progress
          status={Object.values(status)}
          active={activeStatus}
          setActive={handleChangeTab}
        />
        <div className="flex h-full w-full gap-5">
          <div className="w-1/3 shrink-0 space-y-3">
            <div className="flex">
              <input
                type="search"
                className="w-full rounded-s-sm px-4 py-2.5 outline-none"
                placeholder="Mã đơn, tên khách hàng, số điện thoại..."
                spellCheck={false}
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <div className="flex w-11 shrink-0 items-center justify-center rounded-e-sm bg-blue-500 text-white">
                <FaSearch className="h-4 w-4" />
              </div>
            </div>
            <OrderList
              orders={orders?.data}
              totalPages={orders?.totalPages}
              currentPage={currentPage}
              handleChangePage={(page) => setCurrentPage(page)}
              selected={selectedOrder}
              setSelected={(item) => setSelectedOrder(item)}
            />
          </div>
          <Detail
            item={selectedOrder}
            refetchOrder={() =>
              getOrders(activeStatus, searchKey, currentPage, PAGE_LIMIT)
            }
            setSelectedOrder={setSelectedOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderLayout;
