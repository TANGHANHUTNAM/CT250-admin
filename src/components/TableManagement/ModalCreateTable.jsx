import { Modal } from "antd";

const ModalCreateTable = ({
  openModalCreateTable,
  setOpenModalCreateTable,
}) => {
  return (
    <>
      <Modal
        title="Tạo bàn mới"
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

export default ModalCreateTable;
