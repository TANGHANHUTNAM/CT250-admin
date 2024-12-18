import { Popconfirm } from "antd";
import { deleteContactService } from "../../services/contactService";
import { fetchContactPending } from "../../redux/reducer/contactSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import StatusCodes from "../../utils/StatusCodes";
import { FaRegTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
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
          1,
        );
        onChangeTablePending({
          current: newPagePending,
          pageSize: limitPending,
        });
        dispatch(
          fetchContactPending({
            page: newPagePending,
            limit: limitPending,
          }),
        );
      }
      toast.success("Xóa liên hệ thành công!");
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
  const { t } = useTranslation();
  return (
    <Popconfirm
      title={t("ModalConfirm.title")}
      description={t("ModalConfirm.description")}
      okText={t("ModalConfirm.okText")}
      cancelText={t("ModalConfirm.cancelText")}
      onConfirm={confirm}
      onCancel={cancel}
    >
      <button className="flex items-center justify-center rounded-md p-2 text-base text-red-500 hover:text-red-500/90">
        <FaRegTrashAlt />
      </button>
    </Popconfirm>
  );
};

export default ModalConfirm;
