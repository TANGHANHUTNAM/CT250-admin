import { useDynamicTitle } from "../../hooks";
import TabContact from "./TabContact";

const Contact = () => {
  useDynamicTitle("Quản lý liên hệ");
  return (
    <>
      <TabContact />
    </>
  );
};

export default Contact;
