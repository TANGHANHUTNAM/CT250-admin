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
      <div className='flex items-stretch'>
      <Language isAuth={isAuth} className="!self-center"/>
      <Tooltip
          placement="right"
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
          <div className="flex items-stretch" onClick={() => setActiveTab("dashboard")} >
            <Avatar size={40} src={avatar} className='self-center mx-6' />
          </div>
        </Tooltip>
      </div>
    </Header>
  )
}

export default HeaderBar