import { Modal } from "antd";
import { formatCurrency } from "../../utils/format";
import dayjs from "dayjs";
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
        okButtonProps={{ danger: true }}
        cancelButtonProps={{ style: { display: "none" } }}
        width={1200}
        style={{ top: 20 }}
      >
        {dishDetail && (
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="flex flex-col items-center justify-center md:flex-row">
              <div className="mb-4 md:mb-0 md:w-1/3">
                <img
                  src={dishDetail?.image}
                  alt={dishDetail?.name}
                  className="h-auto w-full rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="md:w-2/3 md:pl-6">
                <h2 className="mb-4 text-3xl font-bold text-yellow-500">
                  {dishDetail?.name}
                </h2>
                <p className="mb-2 text-gray-700">
                  <strong>Danh mục level 1: </strong>{" "}
                  {dishDetail?.category?.[1]?.name}
                </p>
                <p className="mb-2 text-gray-700">
                  <strong>Danh mục level 2: </strong>{" "}
                  {dishDetail?.category?.[2]?.name}
                </p>

                <p className="mb-2 text-gray-700">
                  <strong>Thành phần: </strong> {dishDetail?.ingredients}
                </p>
                <p className="mb-2 text-gray-700">
                  <strong>Khẩu phần:</strong> {dishDetail?.servingSize}
                </p>
                <p className="mb-2 text-gray-700">
                  <strong>Thời gian chuẩn bị: </strong>
                  {dishDetail?.preparationTime}
                </p>
                <p className="mb-2 text-gray-700">
                  <strong>Mô tả:</strong> {dishDetail?.description}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <p className="mb-2 text-gray-700">
                    <strong>Giá:</strong>{" "}
                    <span className="font-medium text-red-400">
                      {formatCurrency(dishDetail?.price)}
                    </span>
                  </p>
                  {dishDetail?.discount > 0 && (
                    <p className="mb-2 text-gray-700">
                      <strong>Giá sau giảm:</strong>{" "}
                      <span className="font-medium text-red-500">
                        {formatCurrency(dishDetail?.discountedPrice)}
                      </span>
                    </p>
                  )}
                  {dishDetail?.discount > 0 && (
                    <p className="mb-2 text-gray-700">
                      <strong>Ngày bắt đầu giảm giá:</strong>{" "}
                      <span className="font-medium text-red-500">
                        {dayjs(dishDetail?.discountStartDate).format(
                          "DD/MM/YYYY",
                        )}
                      </span>
                    </p>
                  )}
                  {dishDetail?.discount > 0 && (
                    <p className="mb-2 text-gray-700">
                      <strong>Ngày kết thúc giảm giá:</strong>{" "}
                      <span className="font-medium text-red-500">
                        {dayjs(dishDetail?.discountEndDate).format(
                          "DD/MM/YYYY",
                        )}
                      </span>
                    </p>
                  )}
                  <p className="mb-2 text-gray-700">
                    <strong>Món mới:</strong>{" "}
                    {dishDetail?.isNewDish ? (
                      <span className="w-fit rounded-md border border-red-500 px-3 py-1 text-red-500">
                        Mới
                      </span>
                    ) : (
                      <span className="w-fit rounded-md border border-yellow-500 px-3 py-1 text-yellow-500">
                        Cũ
                      </span>
                    )}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong>Có sẵn: </strong>
                    {dishDetail?.isAvailibility ? (
                      <span className="w-fit rounded-md border border-green-500 px-3 py-1 text-green-500">
                        Có
                      </span>
                    ) : (
                      <span className="w-fit rounded-md border border-yellow-500 px-3 py-1 text-yellow-500">
                        Không
                      </span>
                    )}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong>Tổng số lượt bán: </strong>
                    <span className="font-medium">{dishDetail?.totalSold}</span>
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong>Đánh giá trung bình:</strong>{" "}
                    <span className="font-medium">
                      {" "}
                      {dishDetail?.averageRating}
                    </span>
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong>Ngày tạo:</strong>{" "}
                    <span className="font-medium">
                      {" "}
                      {new Date(dishDetail?.createdAt).toLocaleDateString(
                        "vi-VN",
                      )}
                    </span>
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong>Ngày cập nhật:</strong>{" "}
                    <span className="font-medium">
                      {" "}
                      {new Date(dishDetail?.updatedAt).toLocaleDateString(
                        "vi-VN",
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModalViewDish;
