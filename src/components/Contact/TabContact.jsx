import { ConfigProvider, Tabs } from "antd";
import TableContact from "./TableContact";
import ModalContactPending from "./ModalContactPending";
import { useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContactCompleted,
  fetchContactPending,
} from "../../redux/reducer/contactSlice";
import ModalConfirm from "./ModalConfirm";
import Avatar from "../avatar/Avatar";
import ModalContactCompleted from "./ModalContactCompleted";
import { useTranslation } from "react-i18next";
const TabContact = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactPendingDetails, setContactPendingDetails] = useState(null);
  const [isModalOpenCompleted, setIsModalOpenCompleted] = useState(false);
  const [contactCompletedDetails, setContactCompletedDetails] = useState(null);
  const showModal = (contact) => {
    setContactPendingDetails(contact);
    setIsModalOpen(true);
  };
  const ShowModalCompleted = (contact) => {
    setContactCompletedDetails(contact);
    setIsModalOpenCompleted(true);
  };
  const contactPending = useSelector((state) => state.contact.contactPending);
  const contactCompleted = useSelector(
    (state) => state.contact.contactCompleted
  );
  const { totalContactPending, totalContactCompleted } = useSelector(
    (state) => state.contact
  );
  const [pagePending, setPagePending] = useState(1);
  const [limitPending, setLimitPending] = useState(5);
  const [pageCompleted, setPageCompleted] = useState(1);
  const [limitCompleted, setLimitCompleted] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    dispatch(
      fetchContactCompleted({ page: pageCompleted, limit: limitCompleted })
    );
  }, [dispatch, pageCompleted, limitCompleted]);

  // fetch data
  useEffect(() => {
    dispatch(fetchContactPending({ page: pagePending, limit: limitPending }));
  }, [dispatch, pagePending, limitPending]);

  const columns_tab1 = [
    {
      align: "center",
      title: t("TabContact.STT"),
      className: "w-[50px] text-center font-semibold",
      render: (_, __, index) => (pagePending - 1) * limitPending + index + 1,
    },
    {
      align: "center",
      title: t("TabContact.customerName"),
      dataIndex: "customerName",
      className: "font-semibold text-black/75 w-[200px]",
    },
    {
      align: "center",
      title: t("TabContact.customerEmail"),
      dataIndex: "customerEmail",
      className: "w-[200px]",
    },
    {
      align: "center",
      title: t("TabContact.customerPhone"),
      dataIndex: "customerPhone",
      className: "w-[150px]",
    },
    {
      align: "center",
      title: t("TabContact.customerContent"),
      dataIndex: "content",
      render: (content) => {
        return (
          <div
            style={{
              wordWrap: "break-word",
              wordBreak: "break-word",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {content}
          </div>
        );
      },
    },
    {
      align: "center",
      title: t("TabContact.customerDate"),
      dataIndex: "createdAt",
      className: "w-[200px]",
      render: (date) => {
        return new Date(date).toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      },
    },
    {
      align: "center",
      title: t("TabContact.action"),
      className: "w-[200px]",
      render: (_, contact) => {
        return (
          <div className="flex items-center justify-center space-x-1.5">
            <button
              className="text-white bg-blue-400 hover:bg-blue-500 flex items-center justify-center rounded-md p-2 gap-1"
              onClick={() => showModal(contact)}
            >
              <MdOutlineRemoveRedEye />
              <span>{t("TabContact.see")}</span>
            </button>
            <ModalConfirm
              pagePending={pagePending}
              limitPending={limitPending}
              totalContactPending={totalContactPending}
              contact={contact}
              onChangeTablePending={onChangeTablePending}
              setIsLoading={setIsLoading}
            />
          </div>
        );
      },
    },
  ];
  const columns_tab2 = [
    {
      align: "center",
      title: t("TabContact.STT"),
      className: "w-[50px] text-center font-semibold",
      render: (_, __, index) =>
        (pageCompleted - 1) * limitCompleted + index + 1,
    },
    {
      align: "center",
      title: "Avatar",
      dataIndex: "staff",
      className: "font-semibold text-black/75",
      width: "100px",
      render: (record) => {
        return <Avatar size={40} src={record.avatar} />;
      },
    },
    {
      align: "center",
      title: t("TabContact.Respondent"),
      dataIndex: "staff",
      className: "font-semibold text-black/75 w-[150px]",
      render: (record) => {
        return record?.username;
      },
    },
    {
      align: "center",
      title: t("TabContact.replyContent"),
      dataIndex: "replyContent",
      render: (content) => {
        return (
          <div
            style={{
              wordWrap: "break-word",
              wordBreak: "break-word",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {content}
          </div>
        );
      },
    },
    {
      align: "center",
      title: t("TabContact.customerName"),
      dataIndex: "customerName",
      className: "font-semibold text-black/75 w-[200px]",
    },
    {
      align: "center",
      title: t("TabContact.sentContent"),
      dataIndex: "content",
      render: (content) => {
        return (
          <div
            style={{
              wordWrap: "break-word",
              wordBreak: "break-word",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {content}
          </div>
        );
      },
    },
    {
      align: "center",
      title: t("TabContact.responseTime"),
      dataIndex: "updatedAt",
      className: "w-[200px]",
      render: (date) => {
        return new Date(date).toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      },
    },
    {
      align: "center",
      title: t("TabContact.action"),
      className: "w-[100px]",
      render: (_, contact) => {
        return (
          <div className="flex items-center justify-center space-x-1.5">
            <button
              className="text-white bg-blue-400 hover:bg-blue-500 flex items-center justify-center rounded-md p-2 gap-1"
              onClick={() => ShowModalCompleted(contact)}
            >
              <MdOutlineRemoveRedEye />
              <span>{t("TabContact.see")}</span>
            </button>
          </div>
        );
      },
    },
  ];

  const onChangeTablePending = (pagination, filters, sorter, extra) => {
    if (pagination.current !== pagePending) {
      setPagePending(pagination.current);
    }
    if (pagination.pageSize !== limitPending) {
      setLimitPending(pagination.pageSize);
      setPagePending(1);
    }
  };
  const onChangeTableCompleted = (pagination, filters, sorter, extra) => {
    if (pagination.current !== pageCompleted) {
      setPageCompleted(pagination.current);
    }
    if (pagination.pageSize !== limitCompleted) {
      setLimitCompleted(pagination.pageSize);
      setPageCompleted(1);
    }
  };
  const items = [
    {
      key: "1",
      label: t("TabContact.newContact"),
      children: (
        <TableContact
          columns={columns_tab1}
          data={contactPending}
          rowKey={(record) => record._id}
          onChange={onChangeTablePending}
          loading={isLoading}
          pagination={{
            current: pagePending,
            pageSize: limitPending,
            total: totalContactPending,
            showTotal: (total) => `${t("TabContact.quantity")}: ${total}`,
          }}
        />
      ),
    },
    {
      key: "2",
      label: t("TabContact.processedContact"),
      children: (
        <TableContact
          columns={columns_tab2}
          data={contactCompleted}
          rowKey={(record) => record._id}
          onChange={onChangeTableCompleted}
          pagination={{
            current: pageCompleted,
            pageSize: limitCompleted,
            total: totalContactCompleted,
            showTotal: (total) => `${t("TabContact.quantity")}: ${total}`,
          }}
        />
      ),
    },
  ];
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
        <Tabs size="large" defaultActiveKey="1" items={items} />
      </ConfigProvider>
      <ModalContactPending
        isModalOpen={isModalOpen}
        showModal={showModal}
        setIsModalOpen={setIsModalOpen}
        contact={contactPendingDetails}
        pagePending={pagePending}
        limitPending={limitPending}
        totalContactPending={totalContactPending}
        onChangeTablePending={onChangeTablePending}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        fetchContactCompleted={fetchContactCompleted}
        pageCompleted={pageCompleted}
        limitCompleted={limitCompleted}
        onChangeTableCompleted={onChangeTableCompleted}
      />
      <ModalContactCompleted
        isModalOpen={isModalOpenCompleted}
        showModal={ShowModalCompleted}
        setIsModalOpen={setIsModalOpenCompleted}
        contact={contactCompletedDetails}
      />
    </div>
  );
};

export default TabContact;
