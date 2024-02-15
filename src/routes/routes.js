import Dashboard from "../pages/dashboard";
import LoginPage from "../pages/login-page";
import { createBrowserRouter } from "react-router-dom";
import ProfilePage from "../pages/profile-page";

const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage/>,
    },
    {
      path: "/login",
      element: <LoginPage/>,
    },
    {
      path: "/dashboard",
      element: <Dashboard/>,
      // children: [
      //   {
      //     path: "profile",
      //     element: <ProfilePage/>,
      //   },
      // ],
    },
    {
      path: "/profile",
      element: <ProfilePage/>,
    },
  ]);

export default router;