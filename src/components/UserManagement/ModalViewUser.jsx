import { Modal } from "antd";

const ModalViewUser = ({
  detailUser,
  openModalViewUser,
  setOpenModalViewUser,
}) => {
  return (
    <>
      <Modal
        title="Xem nguoi dung"
        open={openModalViewUser}
        onOk={() => setOpenModalViewUser(false)}
        onCancel={() => setOpenModalViewUser(false)}
      >
        {detailUser && <>{detailUser._id}</>}
      </Modal>
    </>
  );
};

export default ModalViewUser;
