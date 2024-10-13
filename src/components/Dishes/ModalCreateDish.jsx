import { Modal } from "antd";

const ModalCreateDish = ({ openModalCreateDish, setOpenModalCreateDish }) => {
  return (
    <>
      <Modal
        title="THÊM MÓN MỚI"
        open={openModalCreateDish}
        onOk={() => setOpenModalCreateDish(false)}
        okText="Thêm món"
        onCancel={() => setOpenModalCreateDish(false)}
        maskClosable={false}
        cancelButtonProps={{ style: { display: "none" } }}
        width={800}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ModalCreateDish;
