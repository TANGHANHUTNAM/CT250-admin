import * as yup from "yup";
import Input from "../inputs/Input";
import PasswordInput from "../Inputs/PasswordInput";
import { useAppForm } from "../../hooks";
import { useTranslation } from "react-i18next";
import logo from '../../assets/logo.png'

const loginFormSchema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(25, "Password must be at most 25 characters")
      .required("Password is required."),
  })
  .required();

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useAppForm(loginFormSchema);

  const { t } = useTranslation();

  const handleLogin = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full">
      <div className="">
        <img
          src={logo}
          className="mx-auto h-20 w-auto mb-5"
          alt="logo"
        />
        <hr className="mb-5 "/>
      </div>
      <p className="text-center text-primary text-2xl font-semibold mb-6 uppercase">
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
          className="w-full bg-primary px-3 py-2.5 rounded border-b-2 border-tertiary outline-none text-gray-900 text-base"
          label="email"
          register={register}
          errors={errors}
          errorStyle={{ borderBottomColor: "red" }}
        />
        <PasswordInput
          placeholder={t("Auth.password")}
          className="w-full bg-primary px-3 py-2.5 rounded border-b-2 border-tertiary outline-none text-gray-900 text-base"
          label="password"
          register={register}
          errors={errors}
          errorStyle={{ borderBottomColor: "red" }}
        />
      </form>
      <div className="mt-8 w-full">
        <button
          form="login"
          className="w-full bg-tertiary px-4 py-2.5 rounded-md font-semibold hover:bg-[#d6861f]"
        >
          {t("Auth.login")}
        </button>
      </div>
      <div className="mt-1.5 w-full text-right">
        <span className="text-sm text-gray-200 cursor-pointer hover:text-tertiary">
          {t("Auth.forgot_password")}
        </span>
      </div>
    </div>
  );
};

export default LoginForm;