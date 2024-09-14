import React, { useState } from 'react';
import Employee from './Employee';
import data from '../../../../public/locales/ct250.accounts.json'
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { useTranslation } from 'react-i18next';
import { IoPersonAddSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

const EmployeesList = () => {
    const users = data
    const [editMode, setEditMode] = useState(false)
    const { t } = useTranslation();

    return (
        <div>
            <div className='flex justify-between'>
                <h2 className="text-2xl font-bold">{t("Employee.title")}</h2>
                <div className='flex'>
                    <div className='flex text-md !border-2 !border-gray-400 p-2 rounded-md items-center mr-5 w-64'>
                        <FaSearch className='text-gray-400 text-lg' />
                        <input type="text" placeholder={t("Home.search")} className='ml-3 bg-neutral-100 hover:outline-none active:outline-none focus:outline-none w-full' />
                    </div>
                    <button className='bg-violet-700 rounded-md px-4 py-2 text-md font-semibold flex items-center text-white'><IoPersonAddSharp className='!mr-2' />{t("Employee.addaccount")}</button>
                </div>
            </div>
            <div className="mt-10">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-4 w-full">
                    {users.map((user) => (
                        <Employee user={user} editMode={editMode} t={t} />
                    ))}
                </div>
            </div>
            <div className='flex justify-center mt-8'>
                <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        <span className="sr-only">Previous</span>
                        <GrFormPreviousLink aria-hidden="true" className="h-5 w-5" />
                    </a>
                    <a
                        href="#"
                        aria-current="page"
                        className="relative z-10 inline-flex items-center bg-violet-700 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        1
                    </a>
                    <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        2
                    </a>
                    <a
                        href="#"
                        className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                    >
                        3
                    </a>
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        <span className="sr-only">Next</span>
                        <GrFormNextLink aria-hidden="true" className="h-5 w-5" />
                    </a>
                </nav>
            </div>
        </div>
    );
};

export default EmployeesList;
