import { TiLocationOutline } from "react-icons/ti";
import { HiInformationCircle } from "react-icons/hi";
import { BiSolidNotepad } from "react-icons/bi";
import OrderMenu from "./OrderMenu";
import { useTranslation } from "react-i18next";
import StatusTag, { validStatus } from "./StatusTag";
import { formatAddress, formatCurrency } from "../../utils/format";
import { useEffect, useMemo, useState } from "react";
import {
  cancelOrder,
  completeOrder,
  getOrderById,
  updateOrderStatus,
} from "../../services/orderService";
import StatusCodes from "../../utils/StatusCodes";
import { toast } from "react-toastify";
import LoadingButton from "../buttons/LoadingButton";

const Detail = ({
  item,
  refetchOrder = () => {},
  setSelectedOrder = (item) => {},
}) => {
  const { t } = useTranslation();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      const getOrder = async () => {
        const res = await getOrderById(item?._id);

        if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
          setOrder(res.DT);
        }

        if (res && res.EC === StatusCodes.ERROR_DEFAULT) {
          setOrder(null);
          toast.error(res.EM);
        }
      };

      getOrder();
    } else {
      setOrder(null);
    }
  }, [item]);

  const isValidOrder = useMemo(() => {
    let isValid = true;

    for (const item of order?.dishes ?? []) {
      if (item?.deleted === true || item?.available === false) {
        isValid = false;
        break;
      }
    }

    return isValid;
  }, [order]);

  const handleCancelOrder = async () => {
    if (order) {
      setLoading(true);
      const res = await cancelOrder(order?._id);

      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success(res.EM);
        refetchOrder();
        setSelectedOrder(null);
      }

      if (res && res.EC === StatusCodes.ERROR_DEFAULT) {
        toast.error(res.EM);
      }
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (id, status, message) => {
    setLoading(true);
    const res = await updateOrderStatus(id, status);

    if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
      toast.success(message);
      refetchOrder();
      setSelectedOrder(null);
    }

    if (res && res.EC === StatusCodes.ERROR_DEFAULT) {
      toast.error(res.EM);
    }
    setLoading(false);
  };

  const handleAcceptOrder = async () => {
    if (order) {
      await handleUpdateOrderStatus(
        order?._id,
        "preparing",
        "Order has been accepted successfully.",
      );
    }
  };

  const handleCompletePreparation = async () => {
    if (order) {
      await handleUpdateOrderStatus(
        order?._id,
        "shipping",
        "Order has been prepared successfully.",
      );
    }
  };

  const handleCompleteOrder = async () => {
    setLoading(true);
    const res = await completeOrder(order?._id);

    if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
      toast.success(res.EM);
      refetchOrder();
      setSelectedOrder(null);
    }

    if (res && res.EC === StatusCodes.ERROR_DEFAULT) {
      toast.error(res.EM);
    }
    setLoading(false);
  };

  return (
    <div className="basis-8/12 bg-white px-6 py-4">
      <div className="text-xl font-semibold">{t("Order.title")}</div>
      {order ? (
        <div className="divide-y divide-gray-300">
          <div className="flex items-center justify-between py-6">
            <div>
              <div className="mb-1 text-lg font-medium">
                {t("Order.order")}{" "}
                <span className="text-blue-500">#{order?._id}</span>
              </div>
              <div className="text-md mb-1 text-neutral-500">
                {t("Order.orderDate")}:{" "}
                <span className="text-gray-800">
                  {new Date(order?.orderDate).toLocaleString("vi-VN")}
                </span>
              </div>
              {order?.orderStatus === validStatus.canceled && (
                <div className="text-md text-neutral-500">
                  {t("Order.cancelDate")}:{" "}
                  <span className="text-gray-800">
                    {new Date(order?.updatedAt).toLocaleString("vi-VN")}
                  </span>
                </div>
              )}
              {order?.orderStatus === validStatus.completed &&
                order?.deliveryDate && (
                  <div className="text-md text-neutral-500">
                    {t("Order.deliveryDate")}:{" "}
                    <span className="text-gray-800">
                      {new Date(order?.deliveryDate).toLocaleString("vi-VN")}
                    </span>
                  </div>
                )}
            </div>
            <StatusTag status={order?.orderStatus} />
          </div>
          <div className="py-6">
            <div className="flex divide-x divide-gray-300">
              <div className="w-1/2 space-y-4 pr-6">
                <div className="text-base text-neutral-500">
                  {t("Order.delivery")}
                </div>
                <div className="flex items-center">
                  <HiInformationCircle className="mr-2 h-6 w-6 text-blue-400" />
                  <div>
                    <p className="text-base font-medium">
                      {order?.receiverName}
                    </p>
                    <p className="text-gray-600">{order?.receiverPhone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <TiLocationOutline className="mr-2 h-6 w-6 text-blue-400" />
                  <div className="text-gray-600">
                    {formatAddress(order?.receiverAddress)}
                  </div>
                </div>
                {order?.note && (
                  <div className="flex items-center">
                    <BiSolidNotepad className="mr-2 h-6 w-6 text-blue-400" />
                    <div className="text-gray-600">{order?.note}</div>
                  </div>
                )}
              </div>
              <div className="w-1/2 space-y-4 pl-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-base text-neutral-500">
                    {t("Order.payment")}
                  </div>
                  <div className="text-sm font-semibold">
                    {order?.paymentMethod}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-base text-neutral-500">
                    {t("Order.paymentStatus")}
                  </div>
                  <div className="text-sm font-semibold">
                    {order?.paymentStatus ? "Đã thanh toán" : "Chưa thanh toán"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <OrderMenu dishes={order?.dishes} />
          </div>
          <div className="py-2">
            <div className="flex items-center justify-between py-3">
              <div className="text-sm text-gray-800">{t("Order.total")}</div>
              <div className="text-base font-medium">
                {formatCurrency(order?.totalPrice)}
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="text-sm text-gray-800">
                {t("Order.shippingFee")}
              </div>
              <div className="text-base font-medium">
                {formatCurrency(order?.shippingFee)}
              </div>
            </div>
            {order?.coupon && order?.discountedAmount && (
              <div className="flex items-center justify-between py-3">
                <div className="text-sm text-gray-800">{t("Order.coupon")}</div>
                <div className="text-base font-medium">
                  {formatCurrency(order?.discountedAmount)}
                </div>
              </div>
            )}
            <div className="flex items-center justify-between py-3">
              <div className="text-sm text-gray-800">
                {t("Order.orderTotal")}
              </div>
              <div className="text-2xl font-semibold text-blue-600">
                {formatCurrency(order?.orderTotal)}
              </div>
            </div>
          </div>
          {[
            validStatus.pending,
            validStatus.preparing,
            validStatus.delivering,
          ].includes(order?.orderStatus) && (
            <div className="flex justify-end gap-2 pb-2 pt-6">
              {order?.orderStatus === validStatus.pending && (
                <>
                  <LoadingButton
                    label={t("Order.action.action2")}
                    loading={loading}
                    buttonClass="rounded-lg border-2 border-blue-600 p-3 px-6 font-semibold text-blue-600 hover:bg-gray-100"
                    loadingIconClass="!text-blue-600"
                    onClick={handleCancelOrder}
                  />
                  {isValidOrder && (
                    <LoadingButton
                      label={t("Order.action.action1")}
                      loading={loading}
                      buttonClass="rounded-lg bg-blue-600 p-3 px-6 font-semibold text-white hover:bg-blue-700"
                      onClick={handleAcceptOrder}
                    />
                  )}
                </>
              )}

              {order?.orderStatus === validStatus.preparing && (
                <LoadingButton
                  label={t("Order.action.action3")}
                  loading={loading}
                  buttonClass="rounded-lg bg-blue-600 p-3 px-6 font-semibold text-white hover:bg-blue-700"
                  onClick={handleCompletePreparation}
                />
              )}

              {order?.orderStatus === validStatus.delivering && (
                <LoadingButton
                  label={t("Order.action.action4")}
                  loading={loading}
                  buttonClass="rounded-lg bg-blue-600 p-3 px-6 font-semibold text-white hover:bg-blue-700"
                  onClick={handleCompleteOrder}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="my-6 rounded-md bg-blue-50 p-3 text-blue-700">
          {t("Order.noSelected")}
        </div>
      )}
    </div>
  );
};

export default Detail;
