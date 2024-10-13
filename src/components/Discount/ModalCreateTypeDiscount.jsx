import { Modal } from "antd";

const ModalCreateTypeDiscount = ({
  openModalCreateTypeTable,
  setOpenModalCreateTypeTable,
}) => {
  return (
    <>
      <Modal
        title="Tạo mới loại bàn"
        open={openModalCreateTypeTable}
        onOk={() => setOpenModalCreateTypeTable(false)}
        onCancel={() => setOpenModalCreateTypeTable(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ModalCreateTypeDiscount;
