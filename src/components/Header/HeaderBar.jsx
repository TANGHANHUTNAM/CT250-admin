import { Avatar, Button, Layout, theme, Tooltip } from 'antd';
const { Header } = Layout;
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FaCog } from 'react-icons/fa';
import Language from '../Language/Language';
import { FaSearch } from "react-icons/fa";

const HeaderBar = ({ collapsed, setCollapsed, setActiveTab }) => {
  const { t } = useTranslation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const {
    isAuth,
    account: { id, email, avatar, username, role },
  } = useSelector((state) => state.user);

  const navigate = useNavigate();

  return (
    <Header
      className='flex justify-between bg-white p-0 '
    >
      <div className='flex'>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        <div className='flex items-center ml-5'>
          <div className='flex text-md !border-2 !border-gray-400 p-2 rounded-lg items-center mr-5 w-64 bg-neutral-100'>
            <FaSearch className='text-gray-400 text-lg' />
            <input type="text" placeholder={t("Home.search")} className='ml-3 bg-neutral-100 !h-6 !py-0 bg-w hover:outline-none active:outline-none focus:outline-none w-full' />
          </div>
        </div>
      </div>
      <div className='flex items-stretch'>
        <Language isAuth={isAuth} className="!self-center " />
        <Tooltip
          placement="bottom"
          title={t("Home.setting")}
        >
          <li
            className="p-5 hover:!bg-gray-300 transition duration-200 flex items-center cursor-pointer"
            onClick={() => setActiveTab("settings")}
          >
            <FaCog
              className={`m-auto text-2xl !my-1`}
            />
          </li>
        </Tooltip>
        <Tooltip
          placement="bottom"
          title={t("Home.accountInfo")}
        >
          <div className="flex items-stretch hover:!bg-gray-300 mr-4" onClick={() => setActiveTab("dashboard")} >
            <Avatar size={40} src={avatar} className='self-center mx-3 ' />
          </div>
        </Tooltip>
      </div>
    </Header>
  )
}

export default HeaderBar