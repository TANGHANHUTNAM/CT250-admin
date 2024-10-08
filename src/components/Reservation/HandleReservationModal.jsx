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
    }

    if (res && res.EC === StatusCodes.ERROR_DEFAULT) {
      toast.success(res.EM);
    }

    setLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setTables([]);
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
          Math.min(data?.peopleNumber ?? 0, prev + capacity)
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
          <span className="text-violet-600">#{data?._id}</span>
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
              buttonClass="rounded-md border-2 border-violet-500 text-violet-500 px-6 py-2.5 text-sm font-medium hover:bg-gray-100 hover:text-violet-700 focus:outline-none"
              loadingIconClass="!text-violet-700"
              onClick={handleCancel}
            />
            <LoadingButton
              label={t("Reservation.action.reject")}
              loading={loading}
              buttonClass="rounded-md bg-violet-400 text-white px-6 py-2.5 text-sm font-medium hover:bg-violet-500 focus:outline-none"
              loadingIconClass="!text-violet-700"
              onClick={handleReject}
            />
            {tables.length > 0 && (
              <LoadingButton
                label={t("Reservation.action.accept")}
                loading={loading}
                buttonClass="rounded-md bg-violet-600 text-white px-6 py-2.5 text-sm font-medium hover:bg-violet-700 focus:outline-none"
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
      <div className="py-2 divide-y divide-gray-300">
        <div className="py-4 space-y-2.5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaUser className="w-4 h-4 text-violet-600" />
              <span className="text-base">
                {t("Reservation.handleReservation.peopleNumber")}:{" "}
                <span className="font-semibold">{data?.peopleNumber}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaUser className="w-4 h-4 text-violet-600" />
              <span className="text-base">
                {t("Reservation.handleReservation.isNotAssigned")}:{" "}
                <span className="font-semibold">{remainPeoples}</span>
              </span>
            </div>
          </div>
          {data?.note && (
            <div className="flex items-center gap-2">
              <CgNotes className="w-4 h-4 text-violet-600" />
              <span className="text-base">
                {t("Reservation.handleReservation.note")}:{" "}
                <span className="font-semibold">{data?.note}</span>
              </span>
            </div>
          )}
        </div>
        <div className="py-4 space-y-8">
          {tables.length > 0 ? (
            tables.map((table, i) => {
              return (
                <div
                  key={`${table?._id}-${i}`}
                  className="flex items-start gap-10"
                >
                  <div className="shrink-0">
                    <p className="flex items-center gap-2">
                      <MdTableRestaurant className="w-5 h-5 text-violet-400" />
                      <span className="text-base font-medium">
                        {table?.typeName}
                      </span>
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 "></div>
                      <span className="font-medium text-gray-600 text-sm">
                        {t("Reservation.handleReservation.capacity")}:{" "}
                        <span>{table?.capacity}</span>
                      </span>
                    </div>
                  </div>
                  <div className="grow grid grid-cols-10 gap-4 py-1.5">
                    {table?.tables?.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className="col-span-1 flex justify-center items-center"
                        >
                          <div
                            className={`w-9 h-9 text-sm border-2 border-violet-600 font-medium rounded-full flex justify-center items-center cursor-pointer hover:bg-violet-600 ${
                              selectedTables[item?.tableId]
                                ? "bg-violet-600 text-white"
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
            <div className="px-4 py-2.5 bg-violet-100 font-medium text-violet-700 rounded-md">
              {t("Reservation.handleReservation.emptyTables")}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default HandleReservationModal;
