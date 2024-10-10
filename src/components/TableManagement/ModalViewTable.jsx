import { Modal } from "antd";

const ModalViewTable = ({
  openModalViewTable,
  setOpenModalViewTable,
  detailTable,
}) => {
  return (
    <>
      <Modal
        title="Xem chi tiet bàn"
        open={openModalViewTable}
        onOk={() => setOpenModalViewTable(false)}
        onCancel={() => setOpenModalViewTable(false)}
      >
        <div>
          {detailTable && (
            <>
              <p>Tên bàn: {detailTable.tableNumber}</p>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModalViewTable;
