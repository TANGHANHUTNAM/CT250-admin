import { useEffect, useState } from "react";
import { Form, Image, Input, Modal, Upload } from "antd";
import EditorNews from "./EditorNews";
import ImgCrop from "antd-img-crop";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import StatusCodes from "../../utils/StatusCodes";
import { updateNewsService } from "../../services/newsService";
const ModalEditNews = ({
  fetchNews,
  isLoading,
  setIsLoading,
  isOpenModalEditNews,
  setIsOpenModalEditNews,
  detailContent,
  setDetailContent,
}) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const { id } = useSelector((state) => state.user.account);

  useEffect(() => {
    if (detailContent) {
      setFileList([
        {
          uid: "-1",
          name: `${detailContent?.image}`,
          status: "done",
          url: detailContent?.image,
        },
      ]);
      setContent(detailContent?.content);
    }
  }, [detailContent]);

  const onCreate = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    if (!id) {
      toast.error("Vui lòng đăng nhập lại!");
      return;
    }
    formData.append("accountId", id);
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    try {
      const res = await updateNewsService(detailContent?._id, formData);
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        toast.success("Sửa tin tức thành công!");
        fetchNews();
        setContent("");
        setFileList([]);
        setIsOpenModalEditNews(false);
        form.resetFields();
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
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
  return (
    <>
      <Modal
        style={{ padding: 10, top: 0 }}
        width={1200}
        open={isOpenModalEditNews}
        title={`Chỉnh sửa tin tức: ${detailContent?.title}`}
        okText="Lưu"
        cancelText="Hủy"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: isLoading,
        }}
        afterClose={() => {
          form.resetFields();
          setFileList([]);
          setDetailContent(null);
          setIsLoading(false);
        }}
        onCancel={() => setIsOpenModalEditNews(false)}
        destroyOnClose
        maskClosable={false}
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
          label="Tiêu đề"
          name="title"
          initialValue={detailContent?.title}
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
          initialValue={detailContent?.image}
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
          initialValue={detailContent?.content}
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
            setLoading={setIsLoading}
            loading={isLoading}
          />
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
export default ModalEditNews;
