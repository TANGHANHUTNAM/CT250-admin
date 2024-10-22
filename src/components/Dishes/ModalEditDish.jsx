import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
} from "antd";
import ImgCrop from "antd-img-crop";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getDishAdminById, updateDish } from "../../services/dishService";
import StatusCodes from "../../utils/StatusCodes";
import { getAllCategoryLevel2ByLevel1 } from "../../services/categoryService";

const ModalEditDish = ({
  dishDetailList,
  setDishDetailList,
  openModalEditDish,
  setOpenModalEditDish,
  listCategory,
  isLoading,
  setIsLoading,
  fetchDishes,
}) => {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [listCategoryLevel2, setListCategoryLevel2] = useState([]);
  const [selectCagetoryLevel1, setSelectCagetoryLevel1] = useState(null);
  const [selectCagetoryLevel2, setSelectCagetoryLevel2] = useState(null);
  const [dishDetail, setDishDetail] = useState(null);
  const [loadingDishDetail, setLoadingDishDetail] = useState(false);

  useEffect(() => {
    if (!dishDetailList) setLoadingDishDetail(true);
  }, [dishDetailList]);

  const fetchDisheDetail = async () => {
    setLoadingDishDetail(true);
    try {
      const res = await getDishAdminById(dishDetailList?._id);
      console.log(res);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        setDishDetail(res.DT);
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        setDishDetail(null);
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingDishDetail(false);
  };

  const handleAfterOpen = (open) => {
    if (open) {
      fetchDisheDetail();
    }
  };

  const fetchCategoryLevel2 = async () => {
    try {
      const res = await getAllCategoryLevel2ByLevel1(selectCagetoryLevel1);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        setListCategoryLevel2(res.DT);
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectCagetoryLevel1) fetchCategoryLevel2();
  }, [selectCagetoryLevel1]);

  useEffect(() => {
    if (dishDetail) {
      setFileList([
        {
          uid: "-1",
          name: `${dishDetail?.name}.png`,
          status: "done",
          url: dishDetail?.image,
        },
      ]);
      setSelectCagetoryLevel1(dishDetail?.category[1]?._id);
      setSelectCagetoryLevel2(dishDetail?.category[2]?._id);
      form.setFieldsValue({
        name: dishDetail?.name,
        categoryIdParent: dishDetail?.category[1]?._id,
        categoryId: dishDetail?.category[2]?._id,
        ingredients: dishDetail?.ingredients,
        price: dishDetail?.price,
        servingSize: dishDetail?.servingSize,
        preparationTime: dishDetail?.preparationTime,
        description: dishDetail?.description,
        discount: dishDetail?.discount,
        discountStartDate:
          dishDetail?.discount > 0
            ? dayjs(dishDetail?.discountStartDate)
            : null,
        discountEndDate:
          dishDetail?.discount > 0 ? dayjs(dishDetail?.discountEndDate) : null,
        image: dishDetail?.image,
      });
    }
  }, [dishDetail]);

  const uploadButton = (
    <button
      type="button"
      className="flex items-center justify-center gap-1.5 rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-500/90"
    >
      <PlusOutlined />
      <span className="">Upload</span>
    </button>
  );

  const onCreate = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "discountStartDate" || key === "discountEndDate") {
          if (values[key]) {
            formData.append(key, dayjs(values[key]).format("YYYY-MM-DD"));
          }
        } else if (key !== "categoryIdParent") {
          formData.append(key, values[key]);
        }
      });

      const res = await updateDish(dishDetail?._id, formData);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success("Chỉnh sửa món ăn thành công!");
        fetchDishes();
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error("Chỉnh sửa món ăn thất bại!");
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    setOpenModalEditDish(false);
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  return (
    <>
      <Modal
        open={openModalEditDish}
        style={{ top: 50 }}
        title={`Chỉnh sửa món ăn ${dishDetail?.name ? dishDetail?.name : ""}`}
        okText="Lưu"
        cancelText="Hủy"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: isLoading,
          disabled: isLoading,
        }}
        loading={isLoading || loadingDishDetail}
        maskClosable={false}
        cancelButtonProps={{
          danger: true,
        }}
        afterOpenChange={(open) => handleAfterOpen(open)}
        afterClose={() => {
          setDishDetail(null);
          setDishDetailList(null);
          setSelectCagetoryLevel1(null);
          setSelectCagetoryLevel2(null);
        }}
        onCancel={() => setOpenModalEditDish(false)}
        destroyOnClose
        width={1200}
        modalRender={(dom) => (
          <Form
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
        <div className="flex w-full flex-row gap-5">
          <div className="w-1/3">
            <Form.Item
              name="name"
              label="Tên món ăn"
              initialValue={dishDetail?.name}
              rules={[
                {
                  required: true,
                  message: "Tên món ăn không được để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="categoryIdParent"
              label="Danh mục level 1"
              initialValue={selectCagetoryLevel1}
              rules={[
                {
                  required: true,
                  message: "Danh mục không được để trống!",
                },
              ]}
            >
              <Select
                onChange={(value) => {
                  setSelectCagetoryLevel1(value);
                  setSelectCagetoryLevel2(null);
                  form.setFieldsValue({
                    categoryId: null,
                  });
                }}
              >
                {listCategory?.map((category) => (
                  <Select.Option key={category?._id} value={category?._id}>
                    {category?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="categoryId"
              label="Danh mục level 2"
              initialValue={selectCagetoryLevel2}
              rules={[
                {
                  required: true,
                  message: "Danh mục không được để trống!",
                },
              ]}
            >
              <Select
                onChange={(value) => {
                  setSelectCagetoryLevel2(value);
                }}
                disabled={!selectCagetoryLevel1}
              >
                {listCategoryLevel2?.map((category) => (
                  <Select.Option key={category?._id} value={category?._id}>
                    {category?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="ingredients"
              label="Nguyên liệu"
              initialValue={dishDetail?.ingredients}
              rules={[
                {
                  required: true,
                  message: "Nguyên liệu không được để trống!",
                },
              ]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </div>
          <div className="w-1/3">
            <Form.Item
              name="price"
              label="Giá (VND)"
              initialValue={dishDetail?.price}
              rules={[
                {
                  required: true,
                  message: "Giá không được để trống!",
                },
                {
                  pattern: /^[0-9]*$/,
                  message: "Giá món ăn phải là số!",
                },
              ]}
            >
              <InputNumber
                formatter={(value) =>
                  `${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value?.replace(/đ\s?|(,*)/g, "")}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name="servingSize"
              label="Khẩu phần"
              initialValue={dishDetail?.servingSize}
              rules={[
                {
                  required: true,
                  message: "Khẩu phần không được để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="preparationTime"
              label="Thời gian chuẩn bị"
              initialValue={dishDetail?.preparationTime}
              rules={[
                {
                  required: true,
                  message: "Thời gian chuẩn bị không được để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Mô tả"
              initialValue={dishDetail?.description}
              rules={[
                {
                  required: true,
                  message: "Mô tả không được để trống!",
                },
              ]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </div>
          <div className="w-1/3">
            <Form.Item
              name="discount"
              label="Giảm giá (%)"
              initialValue={dishDetail?.discount}
              rules={[
                {
                  required: true,
                  message: "Giảm giá không được để trống!",
                },
                {
                  pattern: /^[0-9]*$/,
                  message: "Giảm giá phải là số!",
                },
                {
                  validator(_, value) {
                    if (value < 0 || value > 100) {
                      return Promise.reject("Giảm giá phải từ 0 đến 100!");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) => `${value}%`}
                parser={(value) => value?.replace("%", "")}
              />
            </Form.Item>
            <Form.Item
              name="discountStartDate"
              label="Ngày bắt đầu giảm giá"
              initialValue={
                dishDetail?.discount > 0
                  ? dayjs(dishDetail?.discountStartDate)
                  : null
              }
              dependencies={["discount"]}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (getFieldValue("discount") > 0 && !value) {
                      return Promise.reject(
                        "Ngày bắt đầu giảm giá không được để trống!",
                      );
                    }
                    if (
                      getFieldValue("discount") > 0 &&
                      value &&
                      !dayjs(value).isSame(dishDetail?.discountStartDate, "day")
                    ) {
                      if (dayjs(value).isBefore(dayjs(), "day")) {
                        return Promise.reject(
                          "Ngày bắt đầu giảm giá không được nhỏ hơn ngày hiện tại!",
                        );
                      }
                    }
                    if (getFieldValue("discount") === 0 && value) {
                      return Promise.reject(
                        "Không được chọn ngày khi không giảm giá!",
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
                placeholder="Chọn ngày"
                disabledDate={(current) => {
                  return current && !current.isAfter(dayjs(), "day");
                }}
                disabled={
                  form.getFieldValue("discountStartDate") &&
                  !form.getFieldValue("discountStartDate")?.isAfter(dayjs())
                }
              />
            </Form.Item>
            <Form.Item
              name="discountEndDate"
              label="Ngày kết thúc giảm giá"
              initialValue={
                dishDetail?.discount > 0
                  ? dayjs(dishDetail?.discountEndDate)
                  : null
              }
              dependencies={["discount"]}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (getFieldValue("discount") > 0 && !value) {
                      return Promise.reject(
                        "Ngày kết thúc giảm giá không được để trống!",
                      );
                    }
                    if (getFieldValue("discount") === 0 && value) {
                      return Promise.reject(
                        "Không được chọn ngày khi không giảm giá!",
                      );
                    }
                    if (
                      getFieldValue("discount") > 0 &&
                      value &&
                      !dayjs(value).isSame(dishDetail?.discountEndDate, "day")
                    ) {
                      if (dayjs(value).isBefore(dayjs(), "day")) {
                        return Promise.reject(
                          "Ngày kết thúc giảm giá không được nhỏ hơn ngày hiện tại!",
                        );
                      }
                    }
                    if (
                      dayjs(value).isBefore(
                        dayjs(getFieldValue("discountStartDate")),
                        "day",
                      ) ||
                      dayjs(value).isSame(
                        dayjs(getFieldValue("discountStartDate")),
                        "day",
                      )
                    ) {
                      return Promise.reject(
                        "Ngày kết thúc giảm giá không được nhỏ hơn hoặc bằng ngày bắt đầu!",
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
                placeholder="Chọn ngày"
                disabledDate={(current) => {
                  const startDate = form.getFieldValue("discountStartDate");
                  return (
                    current &&
                    (!current.isAfter(dayjs(startDate), "day") ||
                      !current.isAfter(dayjs(), "day"))
                  );
                }}
              />
            </Form.Item>
            <Form.Item
              name="image"
              label="Hình ảnh"
              initialValue={dishDetail?.image}
              rules={[
                {
                  required: true,
                  message: "Hình ảnh không được để trống!",
                },
              ]}
            >
              <>
                <ImgCrop rotationSlider>
                  <Upload
                    listType="picture"
                    fileList={fileList}
                    defaultFileList={fileList}
                    onPreview={handlePreview}
                    onChange={({ fileList: newFileList }) => {
                      if (newFileList.length > 1) {
                        toast.error("Chỉ được chọn một hình ảnh!");
                        return;
                      }
                      setFileList(newFileList);
                      form.setFieldsValue({
                        image: newFileList[0]?.originFileObj,
                      });
                    }}
                    onRemove={() => {
                      form.setFieldValue("image", null);
                      setFileList([]);
                    }}
                    beforeUpload={() => false}
                  >
                    {fileList.length < 1 ? uploadButton : null}
                  </Upload>
                </ImgCrop>
              </>
            </Form.Item>
            {previewImage && (
              <Image
                wrapperStyle={{
                  display: "none",
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalEditDish;
