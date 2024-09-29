import { Input } from "antd";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const OPTInput = ({
  label,
  control,
  errors,
  errorClass = "text-xs text-[#ff0000] pt-1.5 block",
  translation = false,
  inputMode = "numeric",
  length = 4,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <Controller
        name={label}
        control={control}
        render={({ field }) => (
          <Input.OTP
            inputMode={inputMode}
            length={length}
            {...field}
            {...props}
          />
        )}
      />
      {errors?.[label] && (
        <span className={errorClass}>
          {translation ? t(errors?.[label]?.message) : errors?.[label]?.message}
        </span>
      )}
    </div>
  );
};

export default OPTInput;
