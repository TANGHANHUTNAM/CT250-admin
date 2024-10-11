import { Modal } from "antd";

const ModalViewDish = ({
  dishDetail,
  setDishDetail,
  openModalViewDish,
  setOpenModalViewDish,
}) => {
  return (
    <>
      <Modal
        afterClose={() => setDishDetail(null)}
        title="XEM CHI TIẾT MÓN ĂN"
        open={openModalViewDish}
        onOk={() => setOpenModalViewDish(false)}
        okText="Đóng"
        onCancel={() => setOpenModalViewDish(false)}
        maskClosable={false}
        cancelButtonProps={{ style: { display: "none" } }}
        width={800}
      >
        {dishDetail && <div>{dishDetail.name}</div>}
      </Modal>
    </>
  );
};

export default ModalViewDish;
