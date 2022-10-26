import { lazy } from "react";
import Login from "../containers/Auth/Login";

const Home = lazy(() => import("containers/Home"));

export function LoginRoute() {
  return [
    {
      path: "/resetPassword/:token",
      component: Login,
      permissions: "",
    },
  ];
}

export function UserRoutes() {
  const userRoutes = [
    {
      path: "/",
      component: Home,
      protected: true,
      name: "Dashboard",
    },
  ];

  return { userRoutes };
}
