import { CgSpinner } from "react-icons/cg";

const LoadingButton = ({
  type = "submit",
  loading = false,
  label,
  loadingLabel,
  loadingIcon,
  buttonClass = "",
  loadingIconClass = "",
  onClick = () => {},
  ...buttonProps
}) => {
  return (
    <button
      type={type}
      className={`inline-flex transition duration-150 ease-in-out items-center disabled:cursor-not-allowed disabled:opacity-90 ${buttonClass}`}
      disabled={loading}
      onClick={onClick}
      {...buttonProps}
    >
      {loading &&
        (loadingIcon ? (
          loadingIcon
        ) : (
          <CgSpinner
            className={`-ml-1 mr-2 h-6 w-6 animate-spin text-white ${loadingIconClass}`}
          />
        ))}
      {loading ? (loadingLabel ? loadingLabel : `${label}...`) : label}
    </button>
  );
};

export default LoadingButton;
