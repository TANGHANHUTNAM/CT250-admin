import { Modal } from "antd";
import Avatar from "../avatar/Avatar";
const ModalViewUser = ({
  detailUser,
  openModalViewUser,
  setOpenModalViewUser,
}) => {
  return (
    <>
      <Modal
        open={openModalViewUser}
        okButtonProps={{ hidden: true }}
        onCancel={() => setOpenModalViewUser(false)}
        cancelButtonProps={{ danger: true }}
        width={1000}
        centered
      >
        <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-3 text-2xl font-bold text-gray-600">
            Thông tin tài khoản
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>

          <div className="flex flex-row items-center gap-5">
            <div className="mb-6 flex w-1/3 items-center justify-center">
              <Avatar size={180} src={detailUser?.avatar} />
            </div>

            <div className="w-2/3 font-semibold text-gray-800">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-base">Họ và tên:</label>
                  <p className="text-gray-600">
                    {detailUser?.fullname || "--"}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-base">Username:</label>
                  <p className="text-gray-600">
                    {detailUser?.username || "--"}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-base">Vai trò:</label>
                  <p className="text-gray-600">{detailUser?.role || "--"}</p>
                </div>
                <div>
                  <label className="mb-1 block text-base">Email:</label>
                  <p className="text-gray-600">{detailUser?.email || "--"}</p>
                </div>
                <div>
                  <label className="mb-1 block text-base">Số điện thoại:</label>
                  <p className="text-gray-600">
                    {detailUser?.phoneNumber || "--"}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-base">Giới tính:</label>
                  <p className="text-gray-600">
                    {(detailUser?.gender === "male"
                      ? "Nam"
                      : detailUser?.gender === "female"
                        ? "Nữ"
                        : "Khác") || "--"}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-base">Ngày sinh:</label>
                  <p className="text-gray-600">
                    {new Date(detailUser?.birthday).toLocaleDateString(
                      "vi-VN",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      },
                    ) || "--"}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-base">Địa chỉ:</label>
                  <p className="text-gray-600">{detailUser?.address || "--"}</p>
                </div>
                <div>
                  <label className="mb-1 block text-base">Ngày tạo:</label>
                  <p className="text-gray-600">
                    {new Date(detailUser?.createdAt).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }) || "--"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalViewUser;
