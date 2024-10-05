import { Modal } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { replyContactService } from "../../services/contactService";
import { useDispatch, useSelector } from "react-redux";
import StatusCodes from "../../utils/StatusCodes";
import { fetchContactPending } from "../../redux/reducer/contactSlice";
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
}) => {
  const dispatch = useDispatch();
  const [contentReply, setContentReply] = useState("");
  const [error, setError] = useState("");
  const id = useSelector((state) => state.user.account.id);
  const handleOk = async (e) => {
    e.preventDefault();
    var newError = "";
    if (contentReply.length === 0) {
      newError = "Nội dung phản hồi không được để trống";
    } else if (contentReply.length < 30) {
      newError = "Nội dung phản hồi phải có ít nhất 30 ký tự";
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
        title={`Khách hàng`}
        open={isModalOpen}
        onOk={handleOk}
        okText="Gửi phản hồi"
        onCancel={handleCancel}
        width={1200}
        afterClose={handleResetForm}
        cancelText="Đóng"
        cancelButtonProps={{ danger: true }}
      >
        <div className="Modal">
          <div className="grid grid-cols-2 text-base">
            {/* Customer */}
            <div className="customer pr-6 flex flex-col gap-3 mt-3">
              <div className="">
                <span className="font-semibold opacity-85">Họ tên:</span>
                <div className="">{contact?.customerName}</div>
              </div>
              <div className="">
                <span className="font-semibold opacity-85">Email:</span>
                <div className="">{contact?.customerEmail}</div>
              </div>
              <div className="">
                <span className="font-semibold opacity-85">Số điện thoại:</span>
                <div className="">{contact?.customerPhone}</div>
              </div>
              <div className="">
                <span className="font-semibold opacity-85">Nội dung:</span>
                <div className="">{contact?.content}</div>
              </div>
              <div className="">
                <span className="font-semibold opacity-85">Thời gian gửi:</span>
                <div className="">{contact?.contactDate}</div>
              </div>
            </div>
            {/* Nội dung phản hồi */}
            <div className="p-3 border-solid border border-black/50 rounded-lg">
              <div className="font-semibold opacity-85:">Nội dung phản hồi</div>
              <div className="form mt-3">
                <form onSubmit={handleOk} action="w-full">
                  <textarea
                    value={contentReply}
                    onChange={(e) => setContentReply(e.target.value)}
                    className="w-full h-48 p-3 border border-black/50 rounded-lg"
                    placeholder="Nhập nội dung phản hồi..."
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
