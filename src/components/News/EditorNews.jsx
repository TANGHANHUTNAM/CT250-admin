import JoditEditor from "jodit-react";
import StatusCodes from "../../utils/StatusCodes";
import { useRef } from "react";

const EditorNews = ({ content, handleChange, loading, setLoading }) => {
  const editor = useRef(null);

  const config = {
    placeholder: "Nhập nội dung",
    style: {
      padding: "18px",
    },
    readonly: loading,
    uploader: {
      insertImageAsBase64URI: false,
      imagesExtensions: ["jpg", "png", "jpeg"],
      url: `http://localhost:8081/api/v1/news/upload-image`,
      format: "json",
      filesVariable: () => "image",
      withCredentials: false,
      headers: {},
      onBeforeUpload: function () {
        setLoading(true);
        if (editor.current) {
          editor.current.events.fire("fileUploadProgress", 0);
        }
      },
      onProgress: function (percentage) {
        if (editor.current) {
          editor.current.events.fire("fileUploadProgress", percentage);
        }
      },
      prepareData: (formData) => {
        let file = formData.get("files[0]");
        if (file) {
          formData.append("image", file);
        }
        formData.delete("source");
        formData.delete("path");
        formData.delete("files[0]");
        return formData;
      },
      isSuccess: function (resp) {
        return resp && resp.EC === StatusCodes.SUCCESS_DAFAULT;
      },
      getMsg: function (resp) {
        console.log("getMsg", resp, resp.message);
        return resp.message;
      },
      process: function (resp) {
        console.log("process", resp, resp.DT);
        return {
          files: [resp?.DT?.url],
          path: "",
          url: resp?.DT?.url,
          error: resp?.EC !== StatusCodes.SUCCESS_DAFAULT ? 1 : 0,
          msg: resp?.EM,
          public_id: resp?.DT?.public_id,
        };
      },
      defaultHandlerSuccess: function (data) {
        console.log("defaultHandlerSuccess", data);
        const files = data?.files || [];
        if (files.length) {
          this.selection.insertImage(files[0], null, 250); // insert image into jodit editor from here
        }
        setLoading(false);
      },
      defaultHandlerError: function (resp) {
        this.events.fire("errorPopap", this.i18n(resp.msg));
        setLoading(false);
      },
    },
  };

  return (
    <JoditEditor
      ref={editor}
      config={config}
      value={content}
      onBlur={(value) => handleChange(value)}
      onChange={() => {}}
    />
  );
};

export default EditorNews;
