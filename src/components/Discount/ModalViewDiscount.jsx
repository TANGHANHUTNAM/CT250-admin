import { Modal } from "antd";

const ModalViewDiscount = ({
  openModalViewTable,
  setOpenModalViewTable,
  detailTable,
}) => {
  return (
    <>
      <Modal
        title="Xem chi tiet coupon"
        open={openModalViewTable}
        onOk={() => setOpenModalViewTable(false)}
        onCancel={() => setOpenModalViewTable(false)}
      >
        <div>
          {detailTable && (
            <>
              <p>Code: {detailTable.tableNumber}</p>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModalViewDiscount;
