import { Modal } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { replyContactService } from "../../services/contactService";
import { useDispatch, useSelector } from "react-redux";
import StatusCodes from "../../utils/StatusCodes";
import { fetchContactPending } from "../../redux/reducer/contactSlice";
import { useTranslation } from "react-i18next";
const ModalContactPending = ({
  isModalOpen,
  setIsModalOpen,
  contact,
  totalContactPending,
  limitPending,
  pagePending,
  onChangeTablePending,
  setIsLoading,
  fetchContactCompleted,
  limitCompleted,
  onChangeTableCompleted,
  isLoading,
}) => {
  const { t }= useTranslation();
  const dispatch = useDispatch();
  const [contentReply, setContentReply] = useState("");
  const [error, setError] = useState("");
  const id = useSelector((state) => state.user.account.id);
  const handleOk = async (e) => {
    e.preventDefault();
    var newError = "";
    if (contentReply.length === 0) {
      newError = t("ModalContactPending.contentErrorEmpty");
    } else if (contentReply.length < 30) {
      newError = t("ModalContactPending.contentErrorLength");
    }
    if (newError.length > 0) {
      setError(newError);
      return;
    } else {
      setIsLoading(true);
      const res = await replyContactService(contact._id, {
        replyContent: contentReply,
        staffId: id,
      });
      try {
        if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
          const newTotalContacts = totalContactPending - 1;
          const newTotalPages = Math.ceil(newTotalContacts / limitPending);
          const newPagePending = Math.max(
            pagePending > newTotalPages ? newTotalPages : pagePending,
            1
          );
          onChangeTablePending({
            current: newPagePending,
            pageSize: limitPending,
          });
          dispatch(
            fetchContactPending({
              page: newPagePending,
              limit: limitPending,
            })
          );
          onChangeTableCompleted({
            current: 1,
            pageSize: limitCompleted,
          });
          dispatch(
            fetchContactCompleted({
              page: 1,
              limit: limitCompleted,
            })
          );
          toast.success(res.EM);
          setIsLoading(false);
        }
        if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
          toast.error(res.EM);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(error);
        setIsLoading(false);
      }
      setError("");
      setIsModalOpen(false);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleResetForm = () => {
    setError("");
    setContentReply("");
  };
  return (
    <>
      <Modal
        title={t("ModalContactPending.Customer")}
        open={isModalOpen}
        onOk={handleOk}
        okText={t("ModalContactPending.sendFeedback")}
        onCancel={handleCancel}
        width={1200}
        afterClose={handleResetForm}
        cancelText={t("ModalContactPending.closeButt")}
        cancelButtonProps={{ danger: true }}
        okButtonProps={{ loading: isLoading }}
      >
        <div className="Modal">
          <div className="grid grid-cols-2 text-base">
            {/* Customer */}
            <div className="customer pr-6 flex flex-col gap-3 mt-3">
              <div className="">
                <span className="font-semibold opacity-85">{t("ModalContactPending.customerName")}</span>
                <div className="">{contact?.customerName}</div>
              </div>
              <div className="">
                <span className="font-semibold opacity-85">{t("ModalContactPending.customerEmail")}</span>
                <div className="">{contact?.customerEmail}</div>
              </div>
              <div className="">
                <span className="font-semibold opacity-85">{t("ModalContactPending.customerPhone")}</span>
                <div className="">{contact?.customerPhone}</div>
              </div>
              <div className="">
                <span className="font-semibold opacity-85">{t("ModalContactPending.customerContent")}</span>
                <div className="">{contact?.content}</div>
              </div>
              <div className="">
                <span className="font-semibold opacity-85">{t("ModalContactPending.customerDate")}</span>
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
            <div className="p-3 border-solid border border-black/50 rounded-lg">
              <div className="font-semibold opacity-85:">{t("ModalContactPending.feedbackContent")}</div>
              <div className="form mt-3">
                <form onSubmit={handleOk} action="w-full">
                  <textarea
                    disabled={isLoading}
                    value={contentReply}
                    onChange={(e) => setContentReply(e.target.value)}
                    className="w-full h-48 p-3 border border-black/50 rounded-lg"
                    placeholder={t("ModalContactPending.placeholder")}
                  />
                  <span className="text-sm text-red-500">{error}</span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalContactPending;
