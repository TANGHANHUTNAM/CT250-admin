import "./Input.css";
import { Radio as RadioAnt } from "antd";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Radio = ({
  label,
  control,
  errors,
  errorClass = "text-xs text-[#ff0000] pt-1.5 block",
  translation = false,
  options = [],
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <Controller
        name={label}
        control={control}
        render={({ field }) => (
          <RadioAnt.Group {...field} {...props}>
            {options.map((option, i) => {
              return (
                <RadioAnt key={i} value={option?.value}>
                  {translation ? t(option?.label) : option?.label}
                </RadioAnt>
              );
            })}
          </RadioAnt.Group>
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

export default Radio;
