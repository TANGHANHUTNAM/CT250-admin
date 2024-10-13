import { useTranslation } from "react-i18next";
import { useDynamicTitle } from "../../hooks";
import TabContact from "./TabContact";

const Contact = () => {
  const {t} = useTranslation();
  useDynamicTitle(t("Contact.title"));
  return (
    <div className="p-3">
      <TabContact />
    </div>
  );
};

export default Contact;
