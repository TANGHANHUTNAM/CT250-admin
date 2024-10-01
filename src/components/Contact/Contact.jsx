import { useDynamicTitle } from "../../hooks";
import TableContact from "./TableContact";

const Contact = () => {
  useDynamicTitle("Quản lý liên hệ");
  return (
    <>
      <TableContact />
    </>
  );
};

export default Contact;
