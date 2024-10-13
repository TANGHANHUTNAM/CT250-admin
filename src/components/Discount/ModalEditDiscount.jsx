import { Modal } from "antd";

const ModalEditDiscount = ({ openModalEditTable, setOpenModalEditTable }) => {
  return (
    <>
      <Modal
        title="Chỉnh sửa coupon"
        open={openModalEditTable}
        onOk={() => setOpenModalEditTable(false)}
        onCancel={() => setOpenModalEditTable(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ModalEditDiscount;
