import { DatePicker, Form, InputNumber, Modal, Select } from "antd";
import dayjs from "dayjs";

const ModalCreateDiscount = ({
  openModalCreateCoupon,
  setOpenModalCreateCoupon,
  isLoading,
  handleCreateCoupon,
}) => {
  const [form] = Form.useForm();

  const onCreate = (values) => {
    const data = {
      ...values,
      startDate: dayjs(values.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(values.endDate).format("YYYY-MM-DD"),
    };
    console.log(data);
    handleCreateCoupon(data);
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
        open={openModalCreateCoupon}
        title="Tạo mới mã giảm giá"
        okText="Thêm"
        cancelText="Cancel"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: isLoading,
        }}
        onCancel={() => setOpenModalCreateCoupon(false)}
        cancelButtonProps={{ danger: true }}
        maskClosable={false}
        style={{ top: 20 }}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            disabled={isLoading}
            layout="vertical"
            form={form}
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
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại coupon!",
            },
          ]}
        >
          <Select placeholder="Chọn loại coupon">
            {TypeCoupon.map((item) => (
              <Select.Option key={item.key} value={item.value}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="value"
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
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="Nhập giá trị"
            formatter={(value) =>
              form.getFieldValue("type")
                ? `${value}%`
                : `${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              form.getFieldValue("type")
                ? value?.replace("%", "")
                : value?.replace(/đ\s?|(,*)/g, "")
            }
          />
        </Form.Item>
        <Form.Item
          tooltip="Số lượng coupon cần tạo (tối đa 100 coupon)"
          name="quantity"
          label="Số lượng"
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
          <InputNumber
            style={{
              width: "100%",
            }}
            placeholder="Nhập số lượng"
          />
        </Form.Item>
        <Form.Item
          tooltip="Giá tối thiểu để sử dụng coupon phải lớn hơn 100.000đ"
          name="minimumPriceToUse"
          label="Giá tối thiểu để sử dụng coupon (VNĐ)"
          initialValue={100000}
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
          <InputNumber
            defaultValue={100000}
            formatter={(value) =>
              `${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value?.replace(/\đ\s?|(,*)/g, "")}
            style={{ width: "100%" }}
            placeholder="Nhập giá trị"
          />
        </Form.Item>
        <Form.Item
          name="startDate"
          label="Ngày bắt đầu áp dụng"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày áp dụng!",
            },
            {
              validator(_, value) {
                if (dayjs(value).isBefore(dayjs(), "day")) {
                  return Promise.reject(
                    "Ngày bắt đầu giảm giá không được nhỏ hơn ngày hiện tại!",
                  );
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
            disabledDate={(current) => {
              return (
                current &&
                (current.isBefore(dayjs(), "day") ||
                  current.isSame(dayjs(), "day"))
              );
            }}
            placeholder="Nhập ngày áp dụng"
          />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="Ngày kết thúc áp dụng"
          dependencies={["startDate"]}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày kết thúc!",
            },
            {
              validator(_, value) {
                if (dayjs(value).isBefore(dayjs(), "day")) {
                  return Promise.reject(
                    "Ngày kết thúc giảm giá không được nhỏ hơn ngày hiện tại!",
                  );
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
            disabledDate={(current) => {
              const startDate = form.getFieldValue("startDate");
              return (
                current &&
                (!current.isAfter(dayjs(), "day") ||
                  !current.isAfter(dayjs(startDate), "day"))
              );
            }}
            placeholder="Nhập ngày kết thúc"
          />
        </Form.Item>
        <Form.Item
          name="active"
          label="Trạng thái"
          tooltip="Không bắt buộc"
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

export default ModalCreateDiscount;
