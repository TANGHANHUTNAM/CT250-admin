import { useDynamicTitle } from "../../hooks";

const Settings = () => {
  useDynamicTitle("Cài đặt");
  return <div className="p-3">Settings Content</div>;
};

export default Settings;
