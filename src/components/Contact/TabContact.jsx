import { ConfigProvider, Tabs } from "antd";
import TableContact from "./TableContact";
import ModalContact from "./ModalContact";
import { useState } from "react";

const TabContact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contact, setContact] = useState(null);
  const showModal = (contact) => {
    setContact(contact);
    setIsModalOpen(true);
  };
  const data = [
    {
      key: "1",
      _id: "1",
      customerName: "customerName1",
      customerEmail: "customerEmail1",
      customerPhone: "customerPhone",
      content: "content",
      contactDate: "contactDate",
      updatedAt: "updatedAt",
      username: "username",
      content_reply: "content_reply",
    },
    {
      key: "2",
      _id: "2",
      customerName: "customerName2",
      customerEmail: "customerEmail2",
      customerPhone: "customerPhone",
      content: "content",
      contactDate: "contactDate",
      updatedAt: "updatedAt",
      username: "username",
      content_reply: "content_reply",
    },
  ];
  const columns_tab2 = [
    {
      title: "Tên",
      dataIndex: "customerName",
    },
    {
      title: "Email",
      dataIndex: "customerEmail",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
    },
    {
      title: "Người phản hồi",
      dataIndex: "username",
    },
    {
      title: "Nội dung phản hồi",
      dataIndex: "content_reply",
    },
    {
      title: "Thời gian phản hồi",
      dataIndex: "updatedAt",
    },
    {
      title: "Hành động",
      dataIndex: "english",
    },
  ];
  const columns_tab1 = [
    {
      title: "Tên",
      dataIndex: "customerName",
    },
    {
      title: "Email",
      dataIndex: "customerEmail",
    },
    {
      title: "Số điện thoại",
      dataIndex: "customerPhone",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
    },
    {
      title: "Thời gian gửi",
      dataIndex: "contactDate",
    },
    {
      title: "Hành động",
      render: (contact) => {
        return (
          <button
            className="text-white bg-tertiary"
            onClick={() => showModal(contact)}
          >
            Xử lý
          </button>
        );
      },
    },
  ];
  const onChangeTable = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const items = [
    {
      key: "1",
      label: "Liên hệ mới",
      children: (
        <TableContact
          columns={columns_tab1}
          data={data}
          onChange={onChangeTable}
        />
      ),
    },
    {
      key: "2",
      label: "Liên hệ đã xử lý",
      children: (
        <TableContact
          columns={columns_tab2}
          data={data}
          onChange={onChangeTable}
        />
      ),
    },
  ];
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className="px-3">
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              inkBarColor: "#d69c52",
              itemActiveColor: "#d69c52",
              itemHoverColor: "#d69c52",
              itemSelectedColor: "#d69c52",
            },
          },
        }}
      >
        <Tabs
          size="large"
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
      </ConfigProvider>
      <ModalContact
        isModalOpen={isModalOpen}
        showModal={showModal}
        setIsModalOpen={setIsModalOpen}
        contact={contact}
      />
    </div>
  );
};

export default TabContact;
