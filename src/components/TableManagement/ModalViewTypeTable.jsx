import { Modal } from "antd";

const ModalViewTypeTable = ({
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

export default ModalViewTypeTable;
