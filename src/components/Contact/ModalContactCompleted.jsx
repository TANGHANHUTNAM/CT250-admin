import { Modal } from "antd";
import Avatar from "../avatar/Avatar";
import { useTranslation } from "react-i18next";
const ModalContactCompleted = ({ isModalOpen, setIsModalOpen, contact }) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { t } = useTranslation();
  return (
    <>
      <Modal
        title={t("ModalContactComplete.title")}
        open={isModalOpen}
        onCancel={handleCancel}
        width={1200}
        cancelText={t("ModalContactComplete.cancelText")}
        cancelButtonProps={{ danger: true }}
        okButtonProps={{ hidden: true }}
      >
        <div className="Modal">
          <div className="grid grid-cols-2 text-base">
            {/* Customer */}
            <div className="customer pr-6 flex flex-col gap-3 mt-3">
              <div className="text-xl font-semibold">{t("ModalContactComplete.customer")}</div>
              <div className="">
                <span className="font-semibold opacity-85">{t("ModalContactComplete.customerName")}</span>
                <div className="">{contact?.customerName}</div>
              </div>
              <div className="">
                <span className="font-semibold opacity-85">{t("ModalContactComplete.customerEmail")}</span>
                <div className="">{contact?.customerEmail}</div>
              </div>
              <div className="">
                <span className="font-semibold opacity-85">{t("ModalContactComplete.customerPhone")}</span>
                <div className="">{contact?.customerPhone}</div>
              </div>
              <div className="">
                <span className="font-semibold opacity-85">{t("ModalContactComplete.customerContent")}</span>
                <div className="">{contact?.content}</div>
              </div>
              <div className="">
                <span className="font-semibold opacity-85">{t("ModalContactComplete.customerDate")}</span>
                <div className="">
                  {new Date(contact?.createdAt).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </div>
              </div>
            </div>
            {/* Nội dung phản hồi */}
            <div className="p-3">
              <div className="flex flex-col gap-2 border-2 p-3 border-solid rounded-md border-black">
                <div className="font-semibold text-xl flex justify-between items-center">
                  <span>{t("ModalContactComplete.employee")}</span>
                  <span>
                    <Avatar src={contact?.staff?.avtar?.url} size={40} />
                  </span>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">{t("ModalContactComplete.employeeName")}</span>
                  <span className="ml-3">{contact?.staff?.fullName}</span>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">Username:</span>
                  <span className="ml-3">{contact?.staff?.username}</span>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">{t("ModalContactComplete.employeeRole")}</span>
                  <span className="ml-3 uppercase">{contact?.staff?.role}</span>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">{t("ModalContactComplete.employeeEmail")}</span>
                  <span className="ml-3">{contact?.staff?.email}</span>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">
                  {t("ModalContactComplete.employeePhone")}
                  </span>
                  <span className="ml-3">{contact?.staff?.phoneNumber}</span>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">{t("ModalContactComplete.employeeGender")}</span>
                  <span className="ml-3">{contact?.staff?.gender}</span>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">{t("ModalContactComplete.employeeDOB")}</span>
                  <span className="ml-3">{contact?.staff?.birthday}</span>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">{t("ModalContactComplete.employeeAddress")}</span>
                  <span className="ml-3">{contact?.staff?.address}</span>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">{t("ModalContactComplete.employeeContent")}</span>
                  <div className="">{contact?.replyContent}</div>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">
                  {t("ModalContactComplete.employeeDate")}
                  </span>
                  <div className="">
                    {new Date(contact?.updatedAt).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalContactCompleted;
