import { Modal } from "antd";

const ModalEditTable = ({ openModalEditTable, setOpenModalEditTable }) => {
  return (
    <>
      <Modal
        title="Chỉnh sửa bàn"
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

export default ModalEditTable;
