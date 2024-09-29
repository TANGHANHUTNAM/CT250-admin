import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import LoginPage from "../pages/Login";
import DashboardContent from "../components/Dashboard/DashboardContent";
import UserInfo from "../components/UserInfo/UserInfo";
import Settings from "../components/Dashboard/Settings";
import ReservationLayout from "../layouts/ReservationLayout";
import OderLayout from "../layouts/OrderLayout";
import EmployeesList from "../components/Employee/EmployeesList";
import MenuLayout from "../layouts/MenuLayout";
import Statistical from "../components/Statistical/Statistical";
import Discount from "../components/Discount/Discount";
import Contact from "../components/Contact/Contact";
import News from "../components/News/News";
import PrivateRoute from "./privateRoute";

const routes = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardContent />,
      },
      {
        path: "profile",
        element: <UserInfo />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "manage-emloyee",
        element: <EmployeesList />,
      },
      {
        path: "table-order",
        element: <ReservationLayout />,
      },
      {
        path: "dishes-order",
        element: <OderLayout />,
      },
      {
        path: "manage-dishes",
        element: <MenuLayout />,
      },
      {
        path: "manage-statistical",
        element: <Statistical />,
      },
      {
        path: "manage-discount",
        element: <Discount />,
      },
      {
        path: "manage-contact",
        element: <Contact />,
      },
      {
        path: "manage-news",
        element: <News />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
