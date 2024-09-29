import React from "react";
import { Controller } from "react-hook-form";
import { DatePicker } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs"; // Import dayjs nếu bạn đang sử dụng dayjs

const InputDate = ({
  label,
  control,
  errors,
  valueAsNumber = true,
  errorStyle = {},
  errorClass = "text-xs text-[#ff0000] pt-1.5 block",
  translation = false,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <Controller
        name={label}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            format="DD/MM/YYYY"
            value={field.value ? dayjs(field.value, "DD/MM/YYYY") : null} // Sử dụng dayjs để khởi tạo giá trị ngày
            onChange={(date, dateString) => field.onChange(dateString)}
            placeholder="dd/mm/yyyy"
            style={errors?.[label] ? errorStyle : {}}
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

export default InputDate;
