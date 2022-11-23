import { Dashboard } from "containers/Dashboard";
import { lazy } from "react";

const SetList = lazy(() => import("containers/Set/List"));
const Learn = lazy(() => import("containers/Learn"));
const Learning = lazy(() => import("containers/Learning"));
const SetCreate = lazy(() => import("containers/Set/Create"));
const SetUpdate = lazy(() => import("containers/Set/Update"));

export function UserRoutes() {
  const userRoutes = [
    {
      path: "/",
      component: Dashboard,
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
      path: "/learn/:id",
      component: Learn,
      protected: true,
      name: "Learn",
    },
    {
      path: "/learning",
      component: Learning,
      protected: true,
      name: "Learning",
    }
  ];

  return { userRoutes };
}
