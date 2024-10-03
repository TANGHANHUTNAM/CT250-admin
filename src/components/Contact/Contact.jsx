import { useDynamicTitle } from "../../hooks";
import TabContact from "./TabContact";

const Contact = () => {
  useDynamicTitle("Quản lý liên hệ");
  return (
    <div className="p-3">
      <TabContact />
    </div>
  );
};

export default Contact;
