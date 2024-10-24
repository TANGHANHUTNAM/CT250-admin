import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import LoginPage from "../pages/Login";
import DashboardContent from "../components/Dashboard/DashboardContent";
import UserInfo from "../components/UserInfo/UserInfo";
import ReservationLayout from "../layouts/ReservationLayout";
import OrderLayout from "../layouts/OrderLayout";
import Statistical from "../components/Statistical/Statistical";
import ManageDiscount from "../components/Discount/ManageDiscount";
import Contact from "../components/Contact/Contact";
import News from "../components/News/News";
import { PrivateRoute, RoleRoute } from "./privateRoute";
import NotFound from "../components/NotFound/NotFound";
import NotPermitted from "../components/Permission/NotPermitted";
import ManageTable from "../components/TableManagement/ManageTable";
import Category from "../components/Category/Category";
import ManageDishes from "../components/Dishes/ManageDishes";
import Setting from "../components/Setting/Setting";
import ManageOrder from "../components/OrderManagement/ManageOrder";
import ManageUser from "../components/UserManagement/ManageUser";

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
        element: <Setting />,
      },
      {
        path: "manage-user",
        element: (
          <RoleRoute>
            <ManageUser />
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
        element: <OrderLayout />,
      },
      {
        path: "manage-order",
        element: <ManageOrder />,
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
        element: <ManageDiscount />,
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
