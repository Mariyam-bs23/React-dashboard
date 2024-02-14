import Dashboard from "../pages/dashboard";
import LoginPage from "../pages/login-page";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage/>,
    },
    {
      path: "dashboard",
      element: <Dashboard/>,
    },
  ]);

export default router;