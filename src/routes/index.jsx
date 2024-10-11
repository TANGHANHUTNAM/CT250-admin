import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import LoginPage from "../pages/Login";
import DashboardContent from "../components/Dashboard/DashboardContent";
import UserInfo from "../components/UserInfo/UserInfo";
import Settings from "../components/Dashboard/Settings";
import ReservationLayout from "../layouts/ReservationLayout";
import OderLayout from "../layouts/OrderLayout";
import EmployeesList from "../components/Employee/EmployeesList";
import Statistical from "../components/Statistical/Statistical";
import Discount from "../components/Discount/Discount";
import Contact from "../components/Contact/Contact";
import News from "../components/News/News";
import { PrivateRoute, RoleRoute } from "./privateRoute";
import NotFound from "../components/NotFound/NotFound";
import NotPermitted from "../components/Permission/NotPermitted";
import Customer from "../components/Customer/Customer";
import ManageTable from "../components/TableManagement/ManageTable";
import Category from "../components/Category/Category";
import ManageDishes from "../components/Dishes/ManageDishes";

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
        element: (
          <RoleRoute>
            <EmployeesList />
          </RoleRoute>
        ),
      },
      {
        path: "manage-customer",
        element: (
          <RoleRoute>
            <Customer />
          </RoleRoute>
        ),
      },
      {
        path: "table-order",
        element: <ReservationLayout />,
      },
      {
        path: "manage-table",
        element: <ManageTable />,
      },
      {
        path: "dishes-order",
        element: <OderLayout />,
      },
      {
        path: "manage-category",
        element: <Category />,
      },
      {
        path: "manage-dishes",
        element: <ManageDishes />,
      },
      {
        path: "manage-statistical",
        element: (
          <RoleRoute>
            <Statistical />
          </RoleRoute>
        ),
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
      {
        path: "not-permitted",
        element: <NotPermitted />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

export default router;
