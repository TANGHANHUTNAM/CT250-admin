import React, { useState } from "react";
import { Switch, Checkbox, Select, Button, Divider, Typography } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Title, Text } = Typography;

const Setting = () => {
  // State for the notification checkboxes
  const [notifications, setNotifications] = useState({
    productivityUpdate: true,
    newEvent: true,
    addedToTeam: true,
  });

  // State for notification switches
  const [mobilePush, setMobilePush] = useState(true);
  const [desktopNotification, setDesktopNotification] = useState(true);
  const [emailNotification, setEmailNotification] = useState(false);

  // State for appearance and language
  const [appearance, setAppearance] = useState("Light");
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [language, setLanguage] = useState("English");

  const handleNotificationChange = (e) => {
    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked,
    });
  };

  const handleAppearanceChange = (value) => {
    setAppearance(value);
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  return (
    <div className="mx-auto shadow-md p-4">
      {/* <div className="mb-6 text-center"> */}
        {/* <SettingOutlined className="text-4xl text-blue-500" /> */}
        <Title level={2} className="mt-4">
          Settings
        </Title>
      {/* </div> */}

      {/* My Notifications Section */}
      <div className="mb-8">
        {/* <Divider orientation="left" plain>
          My Notifications
        </Divider> */}

        <div className="mb-6">
          <Title level={5}>Notify me when...</Title>
          <div className="flex flex-col space-y-3">
            <Checkbox
              name="productivityUpdate"
              checked={notifications.productivityUpdate}
              onChange={handleNotificationChange}
            >
              Daily productivity update
            </Checkbox>

            <Checkbox
              name="newEvent"
              checked={notifications.newEvent}
              onChange={handleNotificationChange}
            >
              New event created
            </Checkbox>

            <Checkbox
              name="addedToTeam"
              checked={notifications.addedToTeam}
              onChange={handleNotificationChange}
            >
              When added on new team
            </Checkbox>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* <div>
            <Title level={5}>Mobile push notifications</Title>
            <Text className="block mb-2">
              Receive push notifications whenever your organisation requires your attention.
            </Text>
            <Switch checked={mobilePush} onChange={setMobilePush} />
          </div> */}

          <div>
            <Title level={5}>Desktop Notification</Title>
            <Text className="mb-2 block">
              Receive desktop notifications whenever your organisation requires
              your attention.
            </Text>
            <Switch
              checked={desktopNotification}
              onChange={setDesktopNotification}
            />
          </div>

          <div>
            <Title level={5}>Email Notification</Title>
            <Text className="mb-2 block">
              Receive email notifications whenever your organisation requires
              your attention.
            </Text>
            <Switch
              checked={emailNotification}
              onChange={setEmailNotification}
            />
          </div>
        </div>
      </div>

      {/* My Settings Section */}
      <div className="mb-8">
        {/* <Divider orientation="left" plain>
          My Settings
        </Divider> */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Appearance */}
          <div>
            <Title level={5}>Appearance</Title>
            <Text className="mb-2 block">
              Customize how your theme looks on your device.
            </Text>
            <Select
              value={appearance}
              onChange={handleAppearanceChange}
              className="w-full"
            >
              <Option value="Light">Light</Option>
              <Option value="Dark">Dark</Option>
            </Select>
          </div>

          {/* Two Factor Auth */}
          <div>
            <Title level={5}>Two-factor authentication</Title>
            <Text className="mb-2 block">
              Keep your account secure by enabling 2FA via SMS or using a
              temporary one-time passcode (TOTP).
            </Text>
            <Switch checked={twoFactorAuth} onChange={setTwoFactorAuth} />
          </div>

          {/* Language */}
          <div>
            <Title level={5}>Language</Title>
            <Text className="mb-2 block">
              Customize the language used on your device.
            </Text>
            <Select
              value={language}
              onChange={handleLanguageChange}
              className="w-full"
            >
              <Option value="English">English</Option>
              <Option value="Vietnamese">Vietnamese</Option>
              <Option value="Spanish">Spanish</Option>
            </Select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 text-center">
        <Button type="primary" size="large" className="px-6">
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Setting;
