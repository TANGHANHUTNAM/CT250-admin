import { useTranslation } from "react-i18next";
import StatusTag, { validStatus } from "./StatusTag";
import { useApi } from "../../hooks";
import { completeReservation } from "../../services/reservationService";
import LoadingButton from "../buttons/LoadingButton";

const Detail = ({
  reservation,
  setOpen = () => {},
  handleComplete = (func) => {},
}) => {
  const { t } = useTranslation();

  const { loading, apiFunction: handleCompleteReservation } = useApi(
    async (id) => await completeReservation(id),
  );

  return (
    <>
      <div className="grow rounded-sm bg-white p-6">
        <div className="text-xl font-semibold">{t("Reservation.title")}</div>
        {reservation ? (
          <div className="divide-y divide-gray-300">
            <div className="flex items-center justify-between py-6">
              <div>
                <div className="text-lg font-medium">
                  Reservation{" "}
                  <span className="text-blue-500">#{reservation?._id}</span>
                </div>
                <div className="text-base text-gray-500">
                  {new Date(reservation?.createdAt).toLocaleString("vi-VN")}
                </div>
              </div>
              <StatusTag status={reservation?.status} />
            </div>
            <div className="space-y-5 py-6">
              <div className="flex">
                <div className="w-2/5 text-sm text-neutral-500">
                  {t("Reservation.info")}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-semibold">
                    {reservation?.customerName}
                  </div>
                  <div className="text-sm font-semibold">
                    {reservation?.customerPhone}
                  </div>
                  <div className="text-sm font-semibold">
                    {reservation?.customerEmail}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2/5 text-sm text-neutral-500">
                  {t("Reservation.qty")}
                </div>
                <div className="text-sm font-semibold">
                  {reservation?.peopleNumber}
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2/5 text-sm text-neutral-500">
                  {t("Reservation.date")}
                </div>
                <div className="text-sm font-semibold">
                  {reservation?.arrivalTime},{" "}
                  {new Date(reservation?.arrivalDate).toLocaleDateString(
                    "vi-VN",
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2/5 text-sm text-neutral-500">
                  {t("Reservation.note")}
                </div>
                <div className="text-sm font-semibold">{reservation?.note}</div>
              </div>
              <div className="flex items-center">
                <div className="w-2/5 text-sm text-neutral-500">
                  {t("Reservation.table")}
                </div>
                <div className="text-sm font-semibold">
                  {reservation?.tables.join().replace(",", ", ")}
                </div>
              </div>
            </div>
            {reservation?.status === validStatus.pending && (
              <div className="flex justify-end py-6">
                <button
                  className="rounded-lg bg-blue-500 p-3 px-6 font-semibold text-white hover:bg-blue-600"
                  onClick={() => setOpen(true)}
                >
                  {t("Reservation.action.handle")}
                </button>
              </div>
            )}
            {reservation?.status === validStatus.confirmed && (
              <div className="flex justify-end py-6">
                <LoadingButton
                  label={t("Reservation.action.complete")}
                  loading={loading}
                  buttonClass="rounded-md bg-blue-500 text-white px-6 py-2.5 text-sm font-medium hover:bg-blue-600 focus:outline-none"
                  onClick={() => handleComplete(handleCompleteReservation)}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="my-6 rounded-md bg-blue-50 p-3 text-blue-700">
            {t("Reservation.noSelected")}
          </div>
        )}
      </div>
    </>
  );
};

export default Detail;
