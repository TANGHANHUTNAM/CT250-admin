import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main"
import LoginPage from "../pages/Login";

const routes = [
    {
        path: "/",
        element: <Main />,
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
];

const router = createBrowserRouter(routes);

export default router;
