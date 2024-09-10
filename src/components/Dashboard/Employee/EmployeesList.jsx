import React, { useState } from 'react';
import Employee from './Employee';
import data from '../../../../public/locales/ct250.accounts.json'
import { FaUserEdit } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import { FaPlus } from "react-icons/fa";

const EmployeesList = () => {
    const users = data
    const [editMode, setEditMode] = useState(false)
    const { t } = useTranslation();

    return (
        <div className="flex-1 text-black">
            <div className='flex justify-between'>
                <h1 className="text-2xl font-bold">{t("Employee.title")}</h1>
                <button onClick={() => setEditMode(!editMode)} className={`rounded-3xl ${!editMode ? "bg-tertiary" : "bg-green-400"}  p-4 active:bg-white active:!text-black duration-100`}>
                    {editMode == false ?
                        <FaUserEdit className='!text-2xl p-0 m-0' /> :
                        <IoCheckmarkDoneCircle className='!text-2xl p-0 m-0' />
                    }
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {editMode &&
                    (<div className="bg-white p-6 rounded-lg shadow-md flex">
                        <button className='m-auto'>
                            <FaPlus className='text-5xl' />
                        </button>
                    </div>)}
                {users.map(user => (
                    <Employee user={user} editMode={editMode} t={t} />
                ))}
            </div>
        </div>
    );
};

export default EmployeesList;
