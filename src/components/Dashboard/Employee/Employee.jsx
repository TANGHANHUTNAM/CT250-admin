import Avatar from "../../avatar/Avatar";
import { FaBarsProgress } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { HiMail } from "react-icons/hi";


const Employee = ({ user, editMode, t }) => {
    return (
        // <div key={user.id} className="bg-neutral-200 p-6 rounded-lg shadow-md flex flex-col relative ">
        //     {editMode && (<div class="absolute top-2 right-2">
        //         <button className=' rounded-lg bg-tertiary p-2 active:bg-white duration-100 mx-4'>
        //             <FaEdit className='!text-xl p-0 m-0' />
        //         </button>
        //         <button className=' rounded-lg bg-tertiary p-2 active:bg-white duration-100'>
        //             <MdDeleteForever className='!text-xl p-0 m-0' />
        //         </button>
        //     </div>)}
        //     
        //     <hr className="mt-2 border-t-2 border-black" />
        //     <div className="mx-8 mt-5">
        //         <h2 className="text-lg font-semibold">{t("Employee.name")}: {user.username}</h2>
        //         <p className="text-gray-600 truncate ">{t("Employee.email")}: {user.email}</p>
        //         <p className="text-gray-600">{t("Employee.position")}: {user.role}</p>
        //     </div>
        // </div>
        <a key={user.id} href={user.href} className="group">
            <div className="bg-white mx-auto rounded-lg p-3 py-6 flex flex-col w-full relative hover:shadow-2xl	">
                <FaBarsProgress className="absolute top-5 right-5 text-lg text-black" />
                <Avatar size={100} src={user.avatar.url} className="!mx-auto !rounded-xl mt-5" />
                <div className="flex flex-col justify-center items-center">
                    <h3 className="mt-4 text-lg text-gray-700 font-semibold">{user.username}</h3>
                    <p className="mt-1 text-md font-medium text-gray-900 text-violet-700">{user.role}</p>
                </div>
                <div>
                    <div className="flex items-center">
                        <div className="bg-violet-100 p-3 rounded-xl group-hover:bg-violet-700 !transition !duration-250 ease-in-out">
                            <FaPhoneAlt className="!text-violet-700 text-lg group-hover:!text-violet-100 transition !duration-250 ease-in-out" />
                        </div>
                        <div>
                            <p className="ml-2 font-medium text-black">{user.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="bg-violet-100 p-3 rounded-xl group-hover:bg-violet-700 !transition !duration-250 ease-in-out">
                            <HiMail className="!text-violet-700 text-lg group-hover:!text-violet-100 transition !duration-250 ease-in-out" />
                        </div>
                        <div>
                            <p className="ml-2 font-medium text-black">{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default Employee