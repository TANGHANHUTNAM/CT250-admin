import { DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";

const ModalEditDiscount = ({
  detailCoupon,
  handleEditCoupon,
  openModalEditCoupon,
  setOpenModalEditCoupon,
  isLoading,
}) => {
  const [form] = Form.useForm();

  const onCreate = (values) => {
    const data = {
      ...values,
      startDate: dayjs(values.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(values.endDate).format("YYYY-MM-DD"),
    };
    handleEditCoupon(detailCoupon?._id, data);
  };

  const TypeCoupon = [
    {
      key: "1",
      value: false,
      title: "Theo giá trị",
    },
    {
      key: "2",
      value: true,
      title: "Theo phần trăm",
    },
  ];

  const statusCoupon = [
    {
      key: "1",
      value: true,
      title: "Kích hoạt",
    },
    {
      key: "2",
      value: false,
      title: "Không kích hoạt",
    },
  ];
  return (
    <>
      <Modal
        open={openModalEditCoupon}
        title={`Chỉnh sửa mã giảm giá ${detailCoupon?.code}`}
        okText="Lưu"
        cancelText="Cancel"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: isLoading,
        }}
        onCancel={() => setOpenModalEditCoupon(false)}
        cancelButtonProps={{ danger: true }}
        maskClosable={false}
        style={{ top: 20 }}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            disabled={isLoading}
            layout="vertical"
            form={form}
            size="middle"
            name="form_in_modal"
            initialValues={{
              modifier: "public",
            }}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="type"
          label="Loại coupon"
          initialValue={detailCoupon?.type}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại coupon!",
            },
          ]}
        >
          <Select disabled placeholder="Chọn loại coupon">
            {TypeCoupon.map((item) => (
              <Select.Option key={item.key} value={item.value}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="value"
          initialValue={detailCoupon?.value}
          tooltip="Giá trị áp dụng cho coupon (theo tiền hoặc phần trăm)"
          label="Giá trị"
          dependencies={["type"]}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá trị!",
            },
            {
              pattern: /^[0-9]*$/,
              message: "Giá trị phải là số!",
            },
            {
              validator(_, value) {
                if (form.getFieldValue("type") && (value < 0 || value > 100)) {
                  return Promise.reject("Giảm giá phải từ 0 đến 100 %!");
                }
                if (value && !form.getFieldValue("type") && value < 1000) {
                  return Promise.reject("Giảm giá phải từ 1000đ trở lên!");
                }
                if (value && !form.getFieldValue("type") && value % 500 !== 0) {
                  return Promise.reject("Giá trị phải là tiền VNĐ");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="Nhập giá trị" />
        </Form.Item>
        <Form.Item
          tooltip="Số lượng coupon cần tạo (tối đa 100 coupon)"
          name="quantity"
          label="Số lượng"
          initialValue={detailCoupon?.quantity}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số lượng!",
            },
            {
              pattern: /^[0-9]*$/,
              message: "Giá trị phải là số và lớn hơn bằng 1!",
            },
            {
              validator(_, value) {
                if (value < 1 || value > 100) {
                  return Promise.reject("Số lượng phải từ 1 đến 100!");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="Nhập giá trị" />
        </Form.Item>
        <Form.Item
          tooltip="Giá tối thiểu để sử dụng coupon phải lớn hơn 100.000đ"
          name="minimumPriceToUse"
          label="Giá tối thiểu để sử dụng coupon (VNĐ)"
          initialValue={detailCoupon?.minimumPriceToUse}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá!",
            },
            {
              pattern: /^[0-9]*$/,
              message: "Giá trị phải là số!",
            },
            {
              validator(_, value) {
                if (value && value < 100000) {
                  return Promise.reject(
                    "Giá tối thiểu phải từ 100.000đ trở lên!",
                  );
                }
                if (value && value % 500 !== 0) {
                  return Promise.reject("Giá trị phải là tiền VNĐ");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="Nhập giá trị" />
        </Form.Item>
        <Form.Item
          name="startDate"
          label="Ngày bắt đầu áp dụng"
          initialValue={dayjs(detailCoupon?.startDate, "DD/MM/YYYY")}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày áp dụng!",
            },
            {
              validator(_, value) {
                const startDate = dayjs(value).startOf("day");

                if (
                  value &&
                  !startDate.isSame(
                    dayjs(detailCoupon?.startDate, "DD/MM/YYYY"),
                  )
                ) {
                  if (dayjs(value).isBefore(dayjs(), "day")) {
                    return Promise.reject(
                      "Ngày bắt đầu giảm giá không được nhỏ hơn ngày hiện tại!",
                    );
                  }
                }
                if (value && form.getFieldValue("endDate")) {
                  if (value > form.getFieldValue("endDate")) {
                    return Promise.reject(
                      "Ngày bắt đầu phải trước ngày kết thúc!",
                    );
                  }
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <DatePicker
            format={"DD/MM/YYYY"}
            style={{
              width: "100%",
            }}
            disabled={
              !dayjs(detailCoupon?.startDate, "DD/MM/YYYY").isAfter(
                dayjs(),
                "day",
              )
            }
            disabledDate={(current) => {
              return current && !current.isAfter(dayjs(), "day");
            }}
            placeholder="Nhập ngày áp dụng"
          />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="Ngày kết thúc áp dụng"
          dependencies={["startDate"]}
          initialValue={dayjs(detailCoupon?.endDate, "DD/MM/YYYY")}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày kết thúc!",
            },
            {
              validator(_, value) {
                const endDate = dayjs(value).startOf("day");
                if (
                  value &&
                  !endDate.isSame(dayjs(detailCoupon?.endDate, "DD/MM/YYYY"))
                ) {
                  if (dayjs(value).isBefore(dayjs(), "day")) {
                    return Promise.reject(
                      "Ngày kết thúc giảm giá không được nhỏ hơn ngày hiện tại!",
                    );
                  }
                }
                const startDate = form.getFieldValue("startDate");
                if (value && startDate) {
                  if (!dayjs(value).isAfter(dayjs(startDate), "day")) {
                    return Promise.reject(
                      "Ngày kết thúc phải sau ngày bắt đầu!",
                    );
                  }
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <DatePicker
            format={"DD/MM/YYYY"}
            style={{
              width: "100%",
            }}
            placeholder="Nhập ngày kết thúc"
          />
        </Form.Item>
        <Form.Item
          name="active"
          label="Trạng thái"
          tooltip="Không bắt buộc"
          initialValue={detailCoupon?.active}
          rules={[]}
        >
          <Select placeholder="Chọn trạng thái">
            {statusCoupon?.map((item) => (
              <Select.Option key={item.key} value={item.value}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalEditDiscount;
