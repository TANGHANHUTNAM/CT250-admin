import { Popconfirm } from "antd";
import { deleteContactService } from "../../services/contactService";
import { fetchContactPending } from "../../redux/reducer/contactSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import StatusCodes from "../../utils/StatusCodes";
import { FaRegTrashAlt } from "react-icons/fa";
const ModalConfirm = ({
  contact,
  pagePending,
  limitPending,
  onChangeTablePending,
  setIsLoading,
  totalContactPending,
}) => {
  const dispatch = useDispatch();
  const handleDeleteContact = async (_id) => {
    setIsLoading(true);
    const res = await deleteContactService(_id);
    try {
      if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
        const newTotalContacts = totalContactPending - 1;
        const newTotalPages = Math.ceil(newTotalContacts / limitPending);
        const newPagePending = Math.max(
          pagePending > newTotalPages ? newTotalPages : pagePending,
          1
        );
        onChangeTablePending({
          current: newPagePending,
          pageSize: limitPending,
        });
        dispatch(
          fetchContactPending({
            page: newPagePending,
            limit: limitPending,
          })
        );
      }
      toast.success(res.EM);
      setIsLoading(false);
      if (res && res.EC !== StatusCodes.SUCCESS_DAFAULT) {
        toast.error(res.EM);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    }
  };
  const confirm = () => {
    handleDeleteContact(contact._id);
  };
  const cancel = () => {};
  return (
    <Popconfirm
      title={`Xóa liên hệ`}
      description={`Bạn có chắc chắn muốn xóa liên hệ này không?`}
      okText={`Có`}
      cancelText={`Không`}
      onConfirm={confirm}
      onCancel={cancel}
    >
      <button className=" text-white bg-red-400 hover:bg-red-500 flex items-center justify-center rounded-md p-2 gap-1">
        <FaRegTrashAlt />
        <span>Xóa</span>
      </button>
    </Popconfirm>
  );
};

export default ModalConfirm;