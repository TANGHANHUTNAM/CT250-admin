import { Modal } from "antd";

const ModalEditDish = ({
  dishDetail,
  setDishDetail,
  openModalEditDish,
  setOpenModalEditDish,
}) => {
  return (
    <>
      <Modal
        title="CHỈNH SỬA MÓN ĂN"
        afterClose={() => setDishDetail(null)}
        open={openModalEditDish}
        onOk={() => setOpenModalEditDish(false)}
        okText="Lưu"
        onCancel={() => setOpenModalEditDish(false)}
        maskClosable={false}
        cancelButtonProps={{ style: { display: "none" } }}
        width={800}
      >
        {dishDetail && <div>{dishDetail._id}</div>}
      </Modal>
    </>
  );
};

export default ModalEditDish;
