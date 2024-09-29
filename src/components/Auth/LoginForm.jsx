import * as yup from "yup";
import logo from "../../assets/logo.png";
import Input from "../inputs/Input";
import PasswordInput from "../Inputs/PasswordInput";
import { useAppForm } from "../../hooks";
import { useTranslation } from "react-i18next";
import { login } from "../../services/authService";
import StatusCodes from "../../utils/StatusCodes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/reducer/userSlice";
import Language from "../Language/Language";

// Error message là các key để translate đa ngôn ngữ và ở các component Input phải có props translation = true
const loginFormSchema = yup
  .object({
    email: yup
      .string()
      .email("Auth.invalid_email")
      .required("Auth.required_email"),
    password: yup
      .string()
      .min(6, "Auth.password_min")
      .max(25, "Auth.password_max")
      .required("Auth.required_password"),
  })
  .required();

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useAppForm(loginFormSchema);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const res = await login(data);

    if (res && res.EC === StatusCodes.SUCCESS_DAFAULT) {
      toast.success(res.EM);
      dispatch(loginSuccess({ ...res.DT, avatar: res.DT?.avatar?.url }));
      navigate("/");
    }

    if (res && res.EC === StatusCodes.ERROR_DEFAULT) {
      toast.error(res.EM);
    }
  };

  return (
    <div className="w-full ">
      <div className="">
        <img src={logo} className="mx-auto h-20 w-auto mb-5" alt="logo" />
        <hr className="mb-5 " />
      </div>
      <p className="text-center text-primary text-2xl font-semibold mb-6 uppercase !text-black">
        {t("Auth.login")}
      </p>
      <form
        id="login"
        className="w-full space-y-5"
        onSubmit={handleSubmit(handleLogin)}
      >
        <Input
          type="email"
          placeholder={t("Auth.email")}
          autoComplete="email"
          className="w-full rounded border-b-2 border-neutral-300 bg-primary px-3 py-2.5 text-base text-gray-900 outline-none"
          label="email"
          register={register}
          errors={errors}
          errorStyle={{ borderBottomColor: "red" }}
          translation={true}
        />
        <PasswordInput
          placeholder={t("Auth.password")}
          className="w-full rounded border-b-2 border-neutral-300 bg-primary px-3 py-2.5 text-base text-gray-900 outline-none"
          label="password"
          register={register}
          errors={errors}
          errorStyle={{ borderBottomColor: "red" }}
          translation={true}
        />
      </form>
      <div className="mt-8 w-full">
        <button
          form="login"
          className="!text-black w-full bg-neutral-300 px-4 py-2.5 rounded-md font-semibold hover:bg-neutral-400"
        >
          {t("Auth.login")}
        </button>
      </div>
      <div className="!text-black mt-3 w-full flex items-center justify-center flex-col gap-y-4 mt-4">
        <Language />
        <span className="!text-black text-sm text-gray-200 cursor-pointer hover:text-tertiary">
          {t("Auth.forgot_password")}
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
