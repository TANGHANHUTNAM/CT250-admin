import { useEffect } from "react";

const Input = ({
  label,
  register = () => {},
  errors,
  errorStyle = {},
  errorClass = "text-xs text-[#ff0000] pt-1.5 block",
  ...props
}) => {
  return (
    <div className="w-full">
      <input
        {...register(label)}
        {...props}
        style={errors?.[label] ? errorStyle : {}}
      />

      {errors?.[label] && (
        <span className={errorClass}>{errors?.[label]?.message}</span>
      )}
    </div>
  );
};

export default Input;