import { useTranslation } from "react-i18next";
import Avatar from "../../avatar/Avatar";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";

const UserInfo = () => {
    const {
        isAuth,
        account,
    } = useSelector((state) => state.user);
    const { t } = useTranslation();


    return (
        <div className="flex flex-col relative ">
            <Avatar size={150} src={account.avatar} className="!mx-auto" />
            <hr className="mt-20 border-t border-black" />
            <div className="mx-8 mt-5">
                <h2 className="text-lg font-semibold">{t("Employee.name")}: {account.username}</h2>
            </div>
            <hr className="mt-2 border-t border-black" />
            <div className="mx-8 mt-5">
                <p className="text-gray-600 truncate ">{t("Employee.email")}: {account.email}</p>
            </div>
            <hr className="mt-2 border-t border-black" />
            <div className="mx-8 mt-5">
                <p className="text-gray-600">{t("Employee.position")}: {account.role}</p>
            </div>
        </div>)
}

export default UserInfo;