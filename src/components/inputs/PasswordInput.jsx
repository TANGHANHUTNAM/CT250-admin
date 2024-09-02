import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const showPwdDefault = {
  show: true,
  showIcon: <FaEye />,
  hideIncon: <FaEyeSlash />,
  iconClass:
    "absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-400 cursor-pointer hover:text-gray-500",
};

const PasswordInput = ({
  label,
  register = () => {},
  errors,
  errorStyle = {},
  errorClass = "text-xs text-[#ff0000] pt-1.5 block",
  showPwd = { ...showPwdDefault },
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const { show, showIcon, hideIncon, iconClass } = {
    ...showPwdDefault,
    ...showPwd,
  };

  return (
    <div className="w-full">
      <div className="w-full relative">
        <input
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          {...register(label)}
          {...props}
          style={errors?.[label] ? errorStyle : {}}
        />

        {show && (
          <span
            className={iconClass}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? showIcon : hideIncon}
          </span>
        )}
      </div>

      {errors?.[label] && (
        <span className={errorClass}>{errors?.[label]?.message}</span>
      )}
    </div>
  );
};

export default PasswordInput;