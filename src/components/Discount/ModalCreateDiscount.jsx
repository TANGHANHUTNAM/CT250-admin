import { Modal } from "antd";

const ModalCreateDiscount = ({
  openModalCreateTable,
  setOpenModalCreateTable,
}) => {
  return (
    <>
      <Modal
        title="Tạo coupon mới"
        open={openModalCreateTable}
        onOk={() => setOpenModalCreateTable(false)}
        onCancel={() => setOpenModalCreateTable(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ModalCreateDiscount;
