import { ConfigProvider, Tabs } from "antd";
import TableContact from "./TableContact";
import ModalContact from "./ModalContact";
import { useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContactCompleted,
  fetchContactPending,
} from "../../redux/reducer/contactSlice";
import { deleteContactService } from "../../services/contactService";
import { toast } from "react-toastify";
import StatusCodes from "../../utils/StatusCodes";
const TabContact = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contact, setContact] = useState(null);
  const showModal = (contact) => {
    setContact(contact);
    setIsModalOpen(true);
  };
  const contactPending = useSelector((state) => state.contact.contactPending);
  const contactCompleted = useSelector(
    (state) => state.contact.contactCompleted
  );
  const { totalContactPending, totalContactCompleted } = useSelector(
    (state) => state.contact
  );
  const [pagePending, setPagePending] = useState(1);
  const [limitPending, setLimitPending] = useState(2);
  const [pageCompleted, setPageCompleted] = useState(1);
  const [limitCompleted, setLimitCompleted] = useState(2);

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
      title: "STT",
      className: "w-[50px] text-center ",
      render: (_, __, index) => index + 1,
    },
    {
      align: "center",
      title: "Họ tên",
      dataIndex: "customerName",
      className: "font-semibold text-black/75 w-[200px]",
    },
    {
      align: "center",
      title: "Email",
      dataIndex: "customerEmail",
      className: "w-[200px]",
    },
    {
      align: "center",
      title: "Số điện thoại",
      dataIndex: "customerPhone",
      className: "w-[150px]",
    },
    {
      align: "center",
      title: "Nội dung",
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
      title: "Thời gian gửi",
      dataIndex: "contactDate",
      className: "w-[200px]",
    },
    {
      align: "center",
      title: "Hành động",
      className: "w-[200px]",
      render: (_, contact) => {
        return (
          <div className="flex items-center justify-center space-x-1.5">
            <button
              className="text-white bg-blue-400 hover:bg-blue-500 flex items-center justify-center rounded-md p-2 gap-1"
              onClick={() => showModal(contact)}
            >
              <MdOutlineRemoveRedEye />
              <span>Xem</span>
            </button>
            <button
              className="text-white bg-red-400 hover:bg-red-500 flex items-center justify-center rounded-md p-2 gap-1"
              onClick={() => handleDeleteContact(contact._id)}
            >
              <FaRegTrashAlt />
              <span>Xóa</span>
            </button>
          </div>
        );
      },
    },
  ];
  const columns_tab2 = [
    {
      align: "center",
      title: "STT",
      className: "w-[50px] text-center ",
      render: (_, __, index) => index + 1,
    },
    {
      align: "center",
      title: "Họ tên",
      dataIndex: "customerName",
      className: "font-semibold text-black/75 w-[200px]",
    },
    {
      align: "center",
      title: "Email",
      dataIndex: "customerEmail",
      className: "w-[200px]",
    },
    {
      align: "center",
      title: "Nội dung gửi",
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
      title: "Thời gian phản hồi",
      dataIndex: "contactDate",
      className: "w-[200px]",
    },
    {
      align: "center",
      title: "Hành động",
      className: "w-[100px]",
      render: (_, contact) => {
        return (
          <div className="flex items-center justify-center space-x-1.5">
            <button
              className="text-white bg-blue-400 hover:bg-blue-500 flex items-center justify-center rounded-md p-2 gap-1"
              onClick={() => showModal(contact)}
            >
              <MdOutlineRemoveRedEye />
              <span>Xem</span>
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
      label: "Liên hệ mới",
      children: (
        <TableContact
          columns={columns_tab1}
          data={contactPending}
          onChange={onChangeTablePending}
          pagination={{
            current: pagePending,
            pageSize: limitPending,
            total: totalContactPending,
            showTotal: (total) => `Số lượng: ${total}`,
          }}
        />
      ),
    },
    {
      key: "2",
      label: "Liên hệ đã xử lý",
      children: (
        <TableContact
          columns={columns_tab2}
          data={contactCompleted}
          onChange={onChangeTableCompleted}
          pagination={{
            current: pageCompleted,
            pageSize: limitCompleted,
            total: totalContactCompleted,
            showTotal: (total) => `Số lượng: ${total}`,
          }}
        />
      ),
    },
  ];

  const handleDeleteContact = async (_id) => {
    const res = await deleteContactService(_id);
    try {
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        dispatch(
          fetchContactPending({ page: pagePending, limit: limitPending })
        );
        toast.success(res.EM);
      }
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
      }
    } catch (error) {
      toast.error(error);
    }
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
        <Tabs size="large" defaultActiveKey="1" items={items} />
      </ConfigProvider>
      <ModalContact
        isModalOpen={isModalOpen}
        showModal={showModal}
        setIsModalOpen={setIsModalOpen}
        contact={contact}
        page={pagePending}
        limit={limitPending}
      />
    </div>
  );
};

export default TabContact;
