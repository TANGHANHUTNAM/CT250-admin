import "./Auth.css";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth w-full bg-bgPrimary !h-screen">
      <div className="max-w-screen-xl mx-auto px-3 pt-20">
        <div className="py-8 w-full sm:py-10 ">
          <div className="text-primary px-5 w-full sm:w-[32rem] sm:bg-[#224642] sm:mx-auto sm:p-6 sm:rounded-md md:w-[34rem]">
            {children}
            <div className="w-full mt-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
