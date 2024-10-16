import { PlusOutlined } from "@ant-design/icons";
import { Form, Image, Input, Modal, Select, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const ModalEditCategory = ({
  isLoading,
  listCategory,
  openModalEditCategory,
  setOpenModalEditCategory,
  categoryEdit,
  setCategoryEdit,
  handleUpdateCategory,
  setOpenModalViewCategoryLevel2,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (categoryEdit?.isParent) {
      setFileList([
        {
          uid: "-1",
          name: `${categoryEdit?.name}.png`,
          status: "done",
          url: categoryEdit?.image,
        },
      ]);
    }
  }, [categoryEdit]);
  const uploadButton = (
    <button
      type="button"
      className="flex items-center justify-center gap-1.5 rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-500/90"
    >
      <PlusOutlined />
      <span className="">Upload</span>
    </button>
  );
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

  const onCreate = (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    handleUpdateCategory(categoryEdit?._id, formData);
    setOpenModalEditCategory(false);
    setOpenModalViewCategoryLevel2(false);
  };
  return (
    <>
      <Modal
        maskClosable={false}
        afterClose={() => {
          setCategoryEdit({});
          form.resetFields();
          setFileList([]);
        }}
        style={{ top: 50 }}
        open={openModalEditCategory}
        title={`Chỉnh sửa danh mục cấp ${categoryEdit?.isParent ? "1" : "2"} ${categoryEdit?.name}`}
        okText="Lưu"
        cancelText="Cancel"
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: isLoading,
        }}
        onCancel={() => setOpenModalEditCategory(false)}
        destroyOnClose
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
        <Form.Item
          name="name"
          label="Tên danh mục"
          initialValue={categoryEdit?.name}
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
          name="parentId"
          label="Danh mục cha"
          initialValue={categoryEdit?.isParent ? "" : categoryEdit?.parentId}
        >
          <Select>
            {listCategory
              ?.filter(
                (category) =>
                  !(
                    categoryEdit?.isParent &&
                    category?._id === categoryEdit?._id
                  ),
              )
              ?.map((category) => (
                <Select.Option key={category?._id} value={category?._id}>
                  {category?.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          initialValue={categoryEdit?.description}
          rules={[
            {
              required: true,
              message: "Mô tả món ăn không được để trống!",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          hidden={!categoryEdit?.isParent}
          name="image"
          label="Hình ảnh"
          initialValue={categoryEdit?.image}
          rules={
            categoryEdit?.isParent
              ? [
                  {
                    required: true,
                    message: "Hình ảnh không được để trống!",
                  },
                ]
              : []
          }
        >
          <>
            <ImgCrop rotationSlider>
              <Upload
                disabled={!categoryEdit?.isParent}
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
      </Modal>
    </>
  );
};
export default ModalEditCategory;
