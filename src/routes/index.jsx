import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard"
import LoginPage from "../pages/Login";

const routes = [
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
];

const router = createBrowserRouter(routes);

export default router;
