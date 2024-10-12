import { Modal } from "antd";

const ModalCreateEmployee = ({
  openModalCreateEmployee,
  setOpenModalCreateEmployee,
}) => {
  return (
    <>
      <Modal
        title="Thêm nhân viên"
        open={openModalCreateEmployee}
        onOk={() => setOpenModalCreateEmployee(false)}
        onCancel={() => setOpenModalCreateEmployee(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ModalCreateEmployee;
