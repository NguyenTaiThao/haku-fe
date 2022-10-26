import { PERM } from "common/constant";
import { lazy } from "react";
import Login from "../containers/Auth/Login";

const Home = lazy(() => import("containers/Home"));

export const adminPrefix = "";
export const adminApi = "/admin";

export function LoginRoute() {
  return [
    {
      path: "/resetPassword/:token",
      component: Login,
      permissions: "",
    },
  ];
}

export function AdminRoutes() {
  const adminRoutes = [
    {
      path: "/",
      component: Home,
      protected: true,
      permissions: [PERM.ADMIN, PERM.PROJECT_OWNER],
      name: "Dashboard",
    },
  ];

  return { adminRoutes };
}
