import { Modal } from "antd";
import { useEffect, useState } from "react";
import LoadingButton from "../buttons/LoadingButton";
import {
  acceptReservation,
  getAvailableTables,
  rejectReservation,
} from "../../services/reservationService";
import StatusCodes from "../../utils/StatusCodes";
import { FaUser } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { MdTableRestaurant } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import _ from "lodash";

const HandleReservationModal = ({
  open = false,
  setOpen = () => {},
  data,
  getReservations,
  setSelectedReservation,
}) => {
  const [loading, setLoading] = useState(false);
  const [tables, setTables] = useState([]);
  const [remainPeoples, setRemainPeoples] = useState(0);
  const [selectedTables, setSelectedTables] = useState({});

  useEffect(() => {
    if (open) {
      const getTables = async () => {
        const res = await getAvailableTables();

        if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
          setTables(res.DT);
        }

        if (res && res.EC === StatusCodes.ERROR_DEFAULT) {
          setOpen(false);
          toast.error(res.EM);
        }
      };

      getTables();
    } else {
      setTables([]);
    }
    setRemainPeoples(data?.peopleNumber);
  }, [open]);

  const handleAccept = async () => {
    if (!_.isEmpty(selectedTables) && remainPeoples === 0) {
      setLoading(true);
      const res = await acceptReservation(data?._id, {
        tableId: Object.values(selectedTables),
      });

      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success(res.EM);
        handleCancel();
        getReservations();
        setSelectedReservation(null);
        setSelectedTables({});
        setRemainPeoples(0);
      }

      if (res && res.EC === StatusCodes.ERROR_DEFAULT) {
        toast.success(res.EM);
      }

      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    const res = await rejectReservation(data?._id);

    if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
      toast.success(res.EM);
      handleCancel();
      getReservations();
      setSelectedReservation(null);
      setSelectedTables({});
      setRemainPeoples(0);
    }

    if (res && res.EC === StatusCodes.ERROR_DEFAULT) {
      toast.success(res.EM);
    }

    setLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setTables([]);
    setSelectedTables({});
    setRemainPeoples(0);
  };

  const handleSelectTable = (table, capacity) => {
    if (table && table.tableId && capacity) {
      if (selectedTables[table.tableId]) {
        // đã được chọn
        setSelectedTables((prev) => {
          const newSelected = { ...prev };
          delete newSelected[table.tableId];
          return newSelected;
        });
        setRemainPeoples((prev) =>
          Math.min(data?.peopleNumber ?? 0, prev + capacity),
        );
      } else if (remainPeoples > 0) {
        // chưa được chọn
        setSelectedTables((prev) => {
          const newSelected = { ...prev };
          newSelected[table.tableId] = table.tableId;
          return newSelected;
        });
        setRemainPeoples((prev) => Math.max(0, prev - capacity));
      }
    }
  };

  const { t } = useTranslation();

  return (
    <Modal
      title={
        <div className="text-xl font-semibold">
          {t("Reservation.handleReservation.title")}{" "}
          <span className="text-blue-500">#{data?._id}</span>
        </div>
      }
      open={open}
      closable={false}
      width={800}
      maskClosable={false}
      destroyOnClose={true}
      footer={() => {
        return (
          <div className="flex items-center justify-end gap-2">
            <LoadingButton
              label={t("Reservation.action.cancel")}
              loading={loading}
              buttonClass="rounded-md border-2 border-blue-400 text-blue-400 px-6 py-2.5 text-sm font-medium hover:bg-gray-100 hover:text-blue-600 focus:outline-none"
              loadingIconClass="!text-blue-600"
              onClick={handleCancel}
            />
            <LoadingButton
              label={t("Reservation.action.reject")}
              loading={loading}
              buttonClass="rounded-md bg-blue-300 text-white px-6 py-2.5 text-sm font-medium hover:bg-blue-400 focus:outline-none"
              loadingIconClass="!text-blue-600"
              onClick={handleReject}
            />
            {tables.length > 0 && (
              <LoadingButton
                label={t("Reservation.action.accept")}
                loading={loading}
                buttonClass="rounded-md bg-blue-500 text-white px-6 py-2.5 text-sm font-medium hover:bg-blue-600 focus:outline-none"
                onClick={handleAccept}
              />
            )}
          </div>
        );
      }}
      styles={{
        content: {
          borderRadius: "0.25rem",
        },
      }}
    >
      <div className="divide-y divide-gray-300 py-2">
        <div className="space-y-2.5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaUser className="h-4 w-4 text-blue-500" />
              <span className="text-base">
                {t("Reservation.handleReservation.peopleNumber")}:{" "}
                <span className="font-semibold">{data?.peopleNumber}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaUser className="h-4 w-4 text-blue-500" />
              <span className="text-base">
                {t("Reservation.handleReservation.isNotAssigned")}:{" "}
                <span className="font-semibold">{remainPeoples}</span>
              </span>
            </div>
          </div>
          {data?.note && (
            <div className="flex items-center gap-2">
              <CgNotes className="h-4 w-4 text-blue-500" />
              <span className="text-base">
                {t("Reservation.handleReservation.note")}:{" "}
                <span className="font-semibold">{data?.note}</span>
              </span>
            </div>
          )}
        </div>
        <div className="space-y-8 py-4">
          {tables.length > 0 ? (
            tables.map((table, i) => {
              return (
                <div
                  key={`${table?._id}-${i}`}
                  className="flex items-start gap-10"
                >
                  <div className="shrink-0">
                    <p className="flex items-center gap-2">
                      <MdTableRestaurant className="h-5 w-5 text-blue-300" />
                      <span className="text-base font-medium">
                        {table?.typeName}
                      </span>
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5"></div>
                      <span className="text-sm font-medium text-gray-600">
                        {t("Reservation.handleReservation.capacity")}:{" "}
                        <span>{table?.capacity}</span>
                      </span>
                    </div>
                  </div>
                  <div className="grid grow grid-cols-10 gap-4 py-1.5">
                    {table?.tables?.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className="col-span-1 flex items-center justify-center"
                        >
                          <div
                            className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-blue-500 text-sm font-medium hover:bg-blue-500 ${
                              selectedTables[item?.tableId]
                                ? "bg-blue-500 text-white"
                                : ""
                            }`}
                            onClick={() =>
                              handleSelectTable(item, table?.capacity)
                            }
                          >
                            {item?.tableNumber}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-md bg-blue-50 px-4 py-2.5 font-medium text-blue-600">
              {t("Reservation.handleReservation.emptyTables")}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default HandleReservationModal;
