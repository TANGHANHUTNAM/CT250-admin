import { InboxOutlined } from "@ant-design/icons";
import { message, Modal, Table, Upload } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import * as xlsx from "xlsx";
const { Dragger } = Upload;

const ModalImportFile = ({ openModalImportFile, setOpenModalImportFile }) => {
  const [dataFile, setDataFile] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const handleImport = () => {
    console.log(dataFile);
    setOpenModalImportFile(false);
  };
  const propsUploadFile = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        //   console.log(info.file, info.fileList);
      }
      if (status === "done") {
        if (info.file) {
          const file = info.file.originFileObj;
          const reader = new FileReader();
          reader.onload = () => {
            const data = new Uint8Array(reader.result);
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const dataSheet = xlsx.utils.sheet_to_json(sheet, {
              header: [
                "fullname",
                "email",
                "phoneNumber",
                "birthday",
                "gender",
                "address",
              ],
              range: 1,
              raw: true,
            });
            // Dữ liệu trong file excel cần có dòng đầu tiên là header theo thứ tự: Họ tên, Email, Số điện thoại, Ngày sinh, Giới tính, Địa chỉ
            // Birthday có thể nhập theo 2 định dạng: MM/DD/YYYY hoặc M/D/YYYY
            const formattedDataSheet = dataSheet.map((row) => {
              if (row.birthday) {
                let formattedBirthday = row.birthday;

                if (typeof row.birthday === "number") {
                  const excelDate = row.birthday;
                  const jsDate = xlsx.SSF.parse_date_code(excelDate);
                  if (jsDate) {
                    formattedBirthday = dayjs(
                      new Date(jsDate.y, jsDate.m - 1, jsDate.d),
                    ).format("YYYY-MM-DD");
                  }
                } else if (typeof row.birthday === "string") {
                  const parsedDate = dayjs(
                    row.birthday,
                    ["M/D/YYYY", "MM/DD/YYYY"],
                    true,
                  );
                  if (parsedDate.isValid()) {
                    formattedBirthday = parsedDate.format("YYYY-MM-DD");
                  } else {
                    console.warn(
                      `Invalid date format for birthday: ${row.birthday}`,
                    );
                  }
                }

                row.birthday = formattedBirthday;
              }
              return row;
            });

            if (formattedDataSheet.length > 0) {
              setDataFile(formattedDataSheet);
            }
          };
          reader.readAsArrayBuffer(file);
        }
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const columns = [
    {
      title: "STT",
      key: "STT",
      width: 50,
      align: "center",
      render: (_, __, index) => (
        <span className="font-semibold">
          {(currentPage - 1) * pageSize + index + 1}
        </span>
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
      key: "fullname",
      align: "center",
      render: (fullname) => {
        return <span className="font-medium">{fullname}</span>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
      align: "center",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
  ];

  return (
    <>
      <Modal
        open={openModalImportFile}
        title="Thêm danh sách nhân viên"
        okText="Import"
        cancelText="Hủy"
        onCancel={() => setOpenModalImportFile(false)}
        destroyOnClose
        afterClose={() => setDataFile([])}
        maskClosable={false}
        onOk={handleImport}
        width={1000}
      >
        <Dragger
          onRemove={() => setDataFile([])}
          customRequest={({ onSuccess }) => {
            setTimeout(() => {
              onSuccess("ok");
            }, 2000);
          }}
          {...propsUploadFile}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Nhấp hoặc kéo tệp vào khu vực này để tải file lên
          </p>
        </Dragger>
        <Table
          size="small"
          title={() => {
            return <span className="text-base">Dữ liệu của file:</span>;
          }}
          bordered
          columns={columns}
          dataSource={dataFile}
          onChange={(pagination) => {
            setCurrentPage(pagination.current);
            setPageSize(pagination.pageSize);
          }}
          rowKey={(record) => record.email}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            showTotal: (total) => `Số lượng: ${total}`,
            showSizeChanger: false,
          }}
        />
      </Modal>
    </>
  );
};
export default ModalImportFile;
