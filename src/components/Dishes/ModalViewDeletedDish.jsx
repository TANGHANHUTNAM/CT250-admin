import { Image, Modal, Table } from "antd";
import { useState } from "react";
import { recoverDish } from "../../services/dishService";
import StatusCodes from "../../utils/StatusCodes";
import { toast } from "react-toastify";
const ModalViewDeletedDish = ({
  openModalViewDeletedDish,
  setOpenModalViewDeletedDish,
  isLoading,
  setIsLoading,
  fetchDishes,
}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [total, setTotal] = useState(2);

  const handleRecoverDish = async (id) => {
    setIsLoading(true);
    console.log("Recover dish", id);
    // try {
    //   const res = await recoverDish(id);
    //   if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
    //     fetchDishes();
    //     toast.success("Khôi phục món ăn thành công");
    //   }
    //   if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
    //     toast.error("Khôi phục món ăn thất bại");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    setIsLoading(false);
  };

  const columns = [
    {
      title: "STT",
      key: "STT",
      width: 50,
      align: "center",
      render: (_, __, index) => (
        <span className="font-semibold">{(page - 1) * limit + index + 1}</span>
      ),
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (field) => <Image width={50} src={field} />,
    },
    {
      title: "Tên món ăn",
      dataIndex: "name",
    },
    {
      title: "Danh mục level 1",
      dataIndex: ["category", "1"],
      render: (field) => <span className="">{field?.name}</span>,
    },
    {
      title: "Danh mục level 2",
      dataIndex: ["category", "2"],
      render: (field) => <span className="">{field?.name}</span>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (field) => (
        <span className="text-red-500">
          {field.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
          onClick={() => handleRecoverDish(record._id)}
          className="rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-500/90"
        >
          Khôi phục
        </button>
      ),
    },
  ];
  const data = [
    {
      _id: "670b71c060e46ca648e20ea2",
      name: "Salad rau mùa sốt cam",
      ingredients:
        "Xà lách carol, xà lách frise, xà lách lô lô tím, xà lách mỡ, xà lách radicchio tím, táo đỏ, táo xanh, cà chua bi, củ cải đường, rau mầm, cà rốt baby, trái olive đen, trái olive xanh.",
      servingSize: "1 - 2 người",
      preparationTime: "6 - 8 phút",
      description:
        "Salad rau mùa sốt cam là sự lựa chọn tuyệt vời cho các tín đồ yêu eat clean. Món ăn có đến 5 loại xà lách (carol, frise, lô lô tím, xà lách mỡ và radicchio tím) kết hợp cùng các loại trái cây như táo, cà chua, ô liu... mang lại nguồn vitamin tổng hợp dồi dào, hỗ trợ tăng cường đề kháng cho cơ thể. Điểm nhấn tạo nên nét chấm phá cho món nằm ở nước sốt cam độc đáo với vị chua ngọt tự nhiên dịu dàng. Salad rau mùa sốt cam thực sự là một bữa tiệc về màu sắc, xua tan cơn nóng mùa hè, đánh thức tối đa vị giác. ",
      isNewDish: true,
      isAvailibility: true,
      totalSold: 0,
      averageRating: 0,
      deleted: false,
      createdAt: "2024-10-13T07:07:44.537Z",
      updatedAt: "2024-10-15T14:40:29.615Z",
      category: {
        1: {
          _id: "670b6cdbfcf2a197d869a7ac",
          name: "Khai vị",
        },
        2: {
          _id: "670b70eafcf2a197d869a7c7",
          name: "Salad",
        },
      },
      image:
        "https://res.cloudinary.com/dej2bd8lx/image/upload/v1729003228/tonatra-retaurant/dish/yde2orwhpsefckg5vrhv.jpg",
      price: 80000,
      discount: 4,
      discountStartDate: "2024-10-15T11:14:19.763Z",
      discountEndDate: "2024-10-29T17:00:00.000Z",
      discountedPrice: 76800,
    },
    {
      _id: "670b725960e46ca648e20eb4",
      name: "Salad rau mùa sốt mác mác",
      ingredients:
        "Táo đỏ, táo xanh, củ dền, cà rốt, xà lách lolo, xà lách carron, chanh dây, dầu oliu, rau quế, mayonaise,...",
      servingSize: "1 người",
      preparationTime: "3 - 5 phút",
      description:
        "Salad rau mùa sốt mác mác được lựa chọn từ những loại rau củ ẩm thực phương Tây như xà lách lolo, xà lách carron, dầu oliu, kết hợp với hương đồng cỏ nội trong văn hoá ẩm thực Việt Nam là củ dền, táo đỏ, táo xanh, chanh dây và rau quế. Tất cả được hòa quyện dưới lớp sốt mác mác rau mùi được cấu thành bởi 3 thành phần chính là chanh dây, rau mùi và mayonaise, đem đến hương vị độc đáo, giàu vitamin C và chất xơ.",
      isNewDish: true,
      isAvailibility: true,
      totalSold: 0,
      averageRating: 0,
      deleted: false,
      createdAt: "2024-10-13T07:10:18.057Z",
      updatedAt: "2024-10-15T10:48:57.593Z",
      category: {
        1: {
          _id: "670b6cdbfcf2a197d869a7ac",
          name: "Khai vị",
        },
        2: {
          _id: "670b70eafcf2a197d869a7c7",
          name: "Salad",
        },
      },
      image:
        "https://res.cloudinary.com/dej2bd8lx/image/upload/v1728803415/tonatra-retaurant/dish/yge4st289hygfqema0xc.jpg",
      price: 68000,
      discount: 0,
      discountedPrice: 68000,
    },
  ];

  const handleAfterOpenChange = () => {};
  const handleOnChange = (pagination) => {
    if (pagination.current !== page) {
      setPage(pagination.current);
    }
    if (pagination.pageSize !== limit) {
      setLimit(pagination.pageSize);
    }
  };
  return (
    <>
      <Modal
        open={openModalViewDeletedDish}
        onOk={() => setOpenModalViewDeletedDish(false)}
        onCancel={() => setOpenModalViewDeletedDish(false)}
        okText="Đóng"
        okButtonProps={{ danger: true }}
        cancelButtonProps={{ style: { display: "none" } }}
        maskClosable={false}
        width={1200}
        style={{ top: 30 }}
        afterOpenChange={handleAfterOpenChange}
        loading={isLoading}
      >
        <Table
          title={() => (
            <div className="text-xl font-medium text-red-500">
              Danh sách món ăn đã xóa
            </div>
          )}
          bordered
          columns={columns}
          dataSource={data}
          rowKey={(record) => record._id}
          onChange={handleOnChange}
          pagination={{
            current: page,
            pageSize: limit,
            total: total,
            showTotal: (total) => `Tổng ${total} món ăn`,
          }}
        />
      </Modal>
    </>
  );
};
export default ModalViewDeletedDish;
