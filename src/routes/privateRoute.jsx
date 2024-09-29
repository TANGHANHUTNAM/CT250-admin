import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NotPermitted from "../components/Permission/NotPermitted";

export const RoleRoute = ({ children }) => {
  const {
    account: { role },
  } = useSelector((state) => state.user);

  return <>{role === "admin" ? children : <NotPermitted />}</>;
};

export const PrivateRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.user);

  return <>{isAuth ? children : <Navigate to="/login" />}</>;
};
