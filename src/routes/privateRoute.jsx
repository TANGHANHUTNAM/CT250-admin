import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.user);

  return <>{isAuth ? children : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
