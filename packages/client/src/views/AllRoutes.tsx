import { createBrowserRouter } from "react-router-dom";

//RouteConstants
import {
  ADMIN,
  BANNER_LIST,
  DEALER,
  FORGOT_PASSWORD,
  REGISTER,
  RESET_PASSWORD,
} from "shared/constants/RouteConstants";

//ProtectedRoute
import ProtectedRoute from "shared/components/ProtectedRoute";

//Views
import AdminDashboard from "shared/view/AdminDashboard/AdminDashboard";
import AdminRoutes from "views/AdminRoutes";
import ForgotPassword from "views/Auth/forgotPassword/ForgotPassword";
import Login from "views/Auth/login/Login";
import OTP from "views/Auth/otp/OTP";
import Register from "views/Auth/register/Register";
import ResetPassword from "views/Auth/resetPassword/ResetPassword";
import BannerList from "views/BannerList";
import DealerLayout from "views/DealerLayout";
import Page404 from "views/Page404/Page404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login location={"/"} />,
    errorElement: <Page404 />,
  },
  {
    path: REGISTER,
    element: <Register location={REGISTER} />,
    errorElement: <Page404 />,
  },
  {
    path: "/otp",
    element: <OTP location={"/otp"} />,
    errorElement: <Page404 />,
  },
  {
    path: FORGOT_PASSWORD,
    element: <ForgotPassword location={FORGOT_PASSWORD} />,
    errorElement: <Page404 />,
  },
  {
    path: RESET_PASSWORD,
    element: <ResetPassword location={RESET_PASSWORD} />,
    errorElement: <Page404 />,
  },
  {
    path: "/",
    element: <ProtectedRoute></ProtectedRoute>,
    errorElement: <Page404 />,
    children: [
      {
        path: ADMIN,
        element: <AdminRoutes />,
        errorElement: <Page404 />,
        children: [
          {
            path: ADMIN,
            element: <AdminDashboard location={ADMIN} />,
            errorElement: <Page404 />,
          },
          {
            path: BANNER_LIST,
            element: <BannerList />,
            errorElement: <Page404 />,
          },
        ],
      },
      {
        path: DEALER,
        element: <DealerLayout />,
        errorElement: <Page404 />,
      },
    ],
  },
]);
