import { useState } from "react";
import { Button, Form, Image, Input, Upload } from "antd";
import EditorNews from "./EditorNews";
import { toast } from "react-toastify";
import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { createNewsService } from "../../services/newsService";
import StatusCodes from "../../utils/StatusCodes";
import useDynamicTitle from "../../hooks/useDynamicTitle";

const CreateNews = () => {
  useDynamicTitle("Thêm tin tức");
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const { id } = useSelector((state) => state.user.account);

  const uploadButton = (
    <button
      type="button"
      className="flex items-center justify-center gap-1.5 rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-500/90"
    >
      <PlusOutlined />
      <span className="">Tải lên</span>
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

  const handleChange = (value) => {
    const sanitizedValue = value.trim() === "<p><br></p>" ? "" : value;
    setContent(sanitizedValue);
    form.setFieldsValue({ content: sanitizedValue });
  };
  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    if (!id) {
      toast.error("Vui lòng đăng nhập lại!");
      return;
    }
    formData.append("accountId", id);
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    try {
      const res = await createNewsService(formData);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success("Tạo tin tức mới thành công!");
        setContent("");
        setFileList([]);
        form.resetFields();
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="p-4">
      <div className="text-3xl font-semibold uppercase text-blue-500">
        Tạo mới tin tức
      </div>
      <div className="mt-5 flex items-center justify-center">
        <Form
          disabled={loading}
          name="form_create_news"
          form={form}
          className="w-full"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[
              {
                required: true,
                message: "Tiêu đề không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ảnh mô tả"
            name="newsImage"
            rules={[
              {
                required: true,
                message: "Ảnh mô tả không được để trống!",
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
                      newsImage: newFileList[0]?.originFileObj,
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

          <Form.Item
            label="Nội dung"
            name="content"
            rules={[
              {
                required: true,
                message: "Nội dung không được để trống",
              },
            ]}
          >
            <EditorNews
              content={content}
              handleChange={handleChange}
              setLoading={setLoading}
              loading={loading}
            />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
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
  );
};

export default CreateNews;
