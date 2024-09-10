import { useDynamicTitle } from "../hooks";
import AuthLayout from "../layouts/AuthLayout";
import LoginForm from "../components/Auth/LoginForm";
import Language from "../components/Language/Language";

const LoginPage = () => {
    useDynamicTitle("Đăng nhập");

    return (
        <AuthLayout>
            <Language />
            <LoginForm />
        </AuthLayout>
    );
};

export default LoginPage;