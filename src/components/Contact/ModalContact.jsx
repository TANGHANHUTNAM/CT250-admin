import { Modal } from "antd";
const ModalContact = ({ isModalOpen, setIsModalOpen, showModal, contact }) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{contact?.customerName}</p>
        <p>{contact?.customerEmail}</p>
        <p>{contact?.customerPhone}</p>
        <p>{contact?.content}</p>
        <p>{contact?.contactDate}</p>
        <p>{contact?.updatedAt}</p>
        <p>{contact?.username}</p>
        <p>{contact?.content_reply}</p>
      </Modal>
    </>
  );
};
export default ModalContact;
