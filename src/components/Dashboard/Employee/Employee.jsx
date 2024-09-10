import Avatar from "../../avatar/Avatar";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Employee = ({ user, editMode ,t}) => {
    return (
        <div key={user.id} className="bg-neutral-200 p-6 rounded-lg shadow-md flex flex-col relative ">
            {editMode && (<div class="absolute top-2 right-2">
                <button className=' rounded-lg bg-tertiary p-2 active:bg-white duration-100 mx-4'>
                    <FaEdit className='!text-xl p-0 m-0' />
                </button>
                <button className=' rounded-lg bg-tertiary p-2 active:bg-white duration-100'>
                    <MdDeleteForever className='!text-xl p-0 m-0' />
                </button>
            </div>)}
            <Avatar size={80} src={user} className="!mx-auto" />
            <hr className="mt-2 border-t-2 border-black" />
            <div className="mx-8 mt-5">
                <h2 className="text-lg font-semibold">{t("Employee.name")}: {user.username}</h2>
                <p className="text-gray-600 truncate ">{t("Employee.email")}: {user.email}</p>
                <p className="text-gray-600">{t("Employee.position")}: {user.role}</p>
            </div>
        </div>
    )
}

export default Employee