import { FaSearch } from "react-icons/fa";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { Button, Select } from 'antd';
import { useState } from "react";
import { useTranslation } from "react-i18next";

const CategoryBar = () => {
    const [activeCategory, setActiveCategory] = useState('signature');
    const { t } = useTranslation();

    return (
        <div className='flex justify-between mb-10'>
            <div className="flex gap-x-2 ">
                <Button onClick={() => setActiveCategory('signature')} className={`${activeCategory == 'signature' ? " bg-violet-700 text-white" : ""} font-semibold p-2 px-4 !w-full !h-full rounded-xl hover:!border-violet-700 hover:!text-violet-700 text-md ease-in duration-100`}>{t("Dish.category.content_1")}</Button>
                <Button onClick={() => setActiveCategory('appetizer')} className={`${activeCategory == 'appetizer' ? " bg-violet-700 text-white" : ""} font-semibold p-2 px-4 !w-full !h-full rounded-xl hover:!border-violet-700 hover:!text-violet-700 text-md ease-in duration-100`}>{t("Dish.category.content_2")}</Button>
                <Button onClick={() => setActiveCategory('maindish')} className={`${activeCategory == 'maindish' ? " bg-violet-700 text-white" : ""} font-semibold p-2 px-4 !w-full !h-full rounded-xl hover:!border-violet-700 hover:!text-violet-700 text-md ease-in duration-100`}>{t("Dish.category.content_3")}</Button>
                <Button onClick={() => setActiveCategory('dessert')} className={`${activeCategory == 'dessert' ? " bg-violet-700 text-white" : ""} font-semibold p-2 px-4 !w-full !h-full rounded-xl hover:!border-violet-700 hover:!text-violet-700 text-md ease-in duration-100`}>{t("Dish.category.content_4")}</Button>
                <Button onClick={() => setActiveCategory('drink')} className={` ${activeCategory == 'drink' ? " bg-violet-700 text-white" : ""} font-semibold p-2 px-4 !w-full !h-full rounded-xl hover:!border-violet-700 hover:!text-violet-700 text-md ease-in duration-100`}>{t("Dish.category.content_5")}</Button>
            </div>
            <div className='flex'>
                <div className='flex text-md !border-2 !border-gray-400 p-2 rounded-md items-center mr-5 w-64'>
                    <FaSearch className='text-gray-400 text-lg' />
                    <input type="text" placeholder={t("Home.search")} className='ml-3 bg-neutral-100 hover:outline-none active:outline-none focus:outline-none w-full' />
                </div>
                <button className='bg-violet-700 rounded-md px-4 py-2 text-md font-semibold flex items-center text-white'><MdOutlineAddCircleOutline className='text-lg !mr-2' />{t("Dish.add")}</button>
            </div>
        </div>
    )
}

export default CategoryBar;