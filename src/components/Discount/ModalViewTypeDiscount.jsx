import { Modal } from "antd";

const ModalViewTypeDiscount = ({
  openModalViewTypeTable,
  setOpenModalViewTypeTable,
}) => {
  return (
    <>
      <Modal
        title="Xem danh sach loại bàn"
        open={openModalViewTypeTable}
        onOk={() => setOpenModalViewTypeTable(false)}
        onCancel={() => setOpenModalViewTypeTable(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ModalViewTypeDiscount;
