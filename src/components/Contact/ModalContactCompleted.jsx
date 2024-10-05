import { Modal } from "antd";
import Avatar from "../avatar/Avatar";
const ModalContactCompleted = ({ isModalOpen, setIsModalOpen, contact }) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title={`Chi tiết liên hệ`}
        open={isModalOpen}
        onCancel={handleCancel}
        width={1200}
        cancelText="Đóng"
        cancelButtonProps={{ danger: true }}
        okButtonProps={{ hidden: true }}
      >
        <div className="Modal">
          <div className="grid grid-cols-2 text-base">
            {/* Customer */}
            <div className="customer pr-6 flex flex-col gap-3 mt-3">
              <div className="text-xl font-semibold">Khách hàng</div>
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
                  <span>Nhân viên</span>
                  <span>
                    <Avatar src={contact?.staff?.avtar?.url} size={40} />
                  </span>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">Họ tên:</span>
                  <span className="ml-3">{contact?.staff?.fullName}</span>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">username:</span>
                  <span className="ml-3">{contact?.staff?.username}</span>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">Vai trò:</span>
                  <span className="ml-3 uppercase">{contact?.staff?.role}</span>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">Email:</span>
                  <span className="ml-3">{contact?.staff?.email}</span>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">
                    Số điện thoại:
                  </span>
                  <span className="ml-3">{contact?.staff?.phoneNumber}</span>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">Giới tính:</span>
                  <span className="ml-3">{contact?.staff?.gender}</span>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">Ngày sinh:</span>
                  <span className="ml-3">{contact?.staff?.birthday}</span>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">Địa chỉ:</span>
                  <span className="ml-3">{contact?.staff?.address}</span>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">Nội dung:</span>
                  <div className="">{contact?.replyContent}</div>
                </div>
                <div className="">
                  <span className="font-semibold opacity-85">
                    Thời gian phản hồi:
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
