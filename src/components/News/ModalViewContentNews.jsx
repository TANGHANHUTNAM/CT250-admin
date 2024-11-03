import { Modal } from "antd";
const ModalViewContentNews = ({
  detailContent,
  setIsOpenModalViewNews,
  isOpenModalViewNews,
}) => {
  return (
    <>
      <Modal
        title={`Tiêu đề: ${detailContent?.title}`}
        width={1200}
        style={{ padding: 20, top: 0 }}
        open={isOpenModalViewNews}
        onOk={() => {
          setIsOpenModalViewNews(false);
        }}
        okButtonProps={{ style: { display: "none" } }}
        cancelText="Đóng"
        onCancel={() => {
          setIsOpenModalViewNews(false);
        }}
        cancelButtonProps={{ danger: true }}
      >
        <div className="flex items-center justify-between">
          <div className="">
            <span className="font-medium">Ngày đăng: </span>
            <span>
              {detailContent?.publishedAt
                ? new Date(detailContent?.publishedAt).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "--"}
            </span>
          </div>
          <div className="">
            <span className="font-medium">Tác giả: </span>
            <span className="">{detailContent?.authorFullName}</span>
          </div>
        </div>
        <div
          className="p-3"
          dangerouslySetInnerHTML={{ __html: detailContent?.content }}
        ></div>
      </Modal>
    </>
  );
};
export default ModalViewContentNews;
