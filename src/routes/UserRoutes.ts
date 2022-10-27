import { lazy } from "react";

const Home = lazy(() => import("containers/Home"));
const SetList = lazy(() => import("containers/Set/List"));
const Learn = lazy(() => import("containers/Learn"));
const SetCreate = lazy(() => import("containers/Set/Create"));
const SetUpdate = lazy(() => import("containers/Set/Update"));

export function UserRoutes() {
  const userRoutes = [
    {
      path: "/",
      component: Home,
      protected: true,
      name: "Dashboard",
    },
    {
      path: "/sets",
      component: SetList,
      protected: true,
      name: "Sets",
    },
    {
      path: "/sets/create",
      component: SetCreate,
      protected: true,
      name: "Create Set",
    },
    {
      path: "/sets/update/:id",
      component: SetUpdate,
      protected: true,
      name: "Update Set",
    },
    {
      path: "/learn",
      component: Learn,
      protected: true,
      name: "Learn",
    },
  ];

  return { userRoutes };
}
