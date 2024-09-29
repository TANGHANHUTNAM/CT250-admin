import { useTranslation } from "react-i18next";

const Textarea = ({
  label,
  register = () => {},
  errors,
  errorStyle = {},
  errorClass = "text-xs text-[#ff0000] pt-1",
  translation = false,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <textarea
        {...register(label)}
        {...props}
        style={errors?.[label] ? errorStyle : {}}
      />

      {errors?.[label] && (
        <span className={errorClass}>
          {translation ? t(errors?.[label]?.message) : errors?.[label]?.message}
        </span>
      )}
    </div>
  );
};

export default Textarea;
