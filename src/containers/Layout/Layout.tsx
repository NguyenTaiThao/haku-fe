import React, {
  useState,
  Suspense,
  useEffect,
  useMemo,
  useContext,
} from "react";
import SideBar from "../../components/SideBar";
import { Route, Switch, useLocation } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/styles";
import AppLoading from "../../components/Loading";
import Breadcrumb from "./Breadcrumb";
import { AuthContext } from "../AuthProvider";
import { adminPrefix, AdminRoutes } from "../../routes/AdminRoutes";
import HomeIcon from "@material-ui/icons/Home";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { PERM, sidebarWidth } from "../../common/constant";
import clsx from "clsx";
import { Paper } from "@material-ui/core";
import Header from "./Header";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import InterestsIcon from "@mui/icons-material/Interests";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactsIcon from "@mui/icons-material/Contacts";
import TokenIcon from "@mui/icons-material/Token";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import NoMatch from "containers/NoMatch";

type devoteeChildren = {
  label: string;
  path: string;
  perm: string;
};

const Layout = React.memo((props) => {
  const [open, setOpen] = useState(
    localStorage.getItem("sidebar")
      ? JSON.parse(localStorage.getItem("sidebar") as string)
      : false
  );
  useEffect(() => {
    localStorage.setItem("sidebar", open);
  }, [open]);
  const location = useLocation();
  const [path, setPath] = useState("");
  const { adminRoutes } = AdminRoutes();
  const classes = useStyle();
  const admin = useContext(AuthContext);

  const prefix = useMemo(() => {
    if (admin) {
      return adminPrefix;
    } else {
      return null;
    }
  }, [admin]);

  const routes = useMemo(() => {
    if (admin) {
      const permission = admin.admin?.project_owner_id
        ? PERM.PROJECT_OWNER
        : PERM.ADMIN;
      const permRoutes = adminRoutes.filter((adminRoute) =>
        adminRoute.permissions.includes(permission)
      );

      return permRoutes;
    }
    return [];
  }, [adminRoutes, admin]);

  useEffect(() => {
    if (location.pathname === prefix) setPath("/");
  }, [location.pathname, path, prefix]);

  const sidebarAdmin = [
    {
      label: "Home",
      icon: <HomeIcon />,
      perm: "",
      path: adminPrefix + "/",
    },
    {
      label: "Contact",
      icon: <ContactsIcon />,
      perm: "",
      path: adminPrefix + "/contacts",
    },
    {
      label: "Sponsor",
      icon: <AssignmentIndIcon />,
      perm: "",
      path: adminPrefix + "/sponsors",
    },
    {
      label: "Project",
      icon: <InterestsIcon />,
      perm: "",
      path: adminPrefix + "/project",
    },
    {
      label: "Affiliator",
      icon: <PeopleAltIcon />,
      perm: "",
      path: adminPrefix + "/affiliators",
    },
    {
      label: "Network",
      icon: <VpnKeyIcon />,
      perm: "",
      path: adminPrefix + "/networks",
    },
    {
      label: "Token",
      icon: <TokenIcon />,
      perm: "",
      path: adminPrefix + "/tokens",
    },
  ];

  const sidebarProjectOwner = [
    {
      label: "Home",
      icon: <HomeIcon />,
      perm: "",
      path: adminPrefix + "/",
    },
    {
      label: "Project",
      icon: <InterestsIcon />,
      perm: "",
      path: adminPrefix + "/project",
    },
  ];

  const crumbs = useMemo(() => {
    const destructPath = [
      "/",
      ...path
        .split("/")
        .slice(1)
        .map((path) => "/" + path)
        .reduce(
          (a: any, c: any) => [...a, a.length ? a[a.length - 1] + c : c],
          []
        ),
    ];
    const crumbNames = routes
      .filter((route) => destructPath.includes(route.path))
      .map((route) => {
        return {
          name: route.name,
          path: route.path,
        };
      });

    return crumbNames.map((crum, index) => ({
      name: crum.name,
      path: crum.path,
    }));
  }, [path, routes]);

  const sidebarList = () => {
    if (admin) {
      if (admin.admin?.project_owner_id) {
        return sidebarProjectOwner;
      }
      return sidebarAdmin;
    }
    return [];
  };

  function render(route: any) {
    return (
      <Route
        path={prefix + route.path}
        exact
        key={route.path}
        render={(_) => {
          setPath(route.path);
          return <route.component />;
        }}
      />
    );
  }

  return (
    <div className={classes.root}>
      <Header open={false} />
      <>
        <div
          style={{
            zIndex: 1,
          }}
        >
          <SideBar sidebarList={sidebarList()} setOpen={setOpen} open={open} />
        </div>
        <Paper
          elevation={6}
          className={clsx(classes.toggleBtn, {
            [classes.toggleBtnOpen]: open,
            [classes.toggleBtnClose]: !open,
          })}
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? (
            <>
              <ChevronLeftIcon style={{ width: 18, height: 18 }} />
            </>
          ) : (
            <>
              <ChevronRightIcon style={{ width: 18, height: 18 }} />
            </>
          )}
        </Paper>
      </>
      <main
        className={`${classes.content}`}
        style={{ marginTop: 15, width: "calc(100% - 300px)" }}
      >
        <Toolbar className={classes.toolbar}></Toolbar>
        <Breadcrumb crumbs={crumbs} prefix={prefix} />
        <Suspense fallback={<AppLoading />}>
          <Switch>
            {routes.map((e) => render(e))}{" "}
            <Route path="*" component={NoMatch} />
          </Switch>
        </Suspense>
      </main>
    </div>
  );
});

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    height: 64,
  },
  content: {
    flexGrow: 1,
    padding: "24px",
    position: "relative",
  },
  sidebarOpen: {
    maxWidth: `calc(100vw - ${sidebarWidth}px)`,
  },
  sidebarClose: {
    maxWidth: `calc(100vw - 70px)`,
  },
  toggleBtn: {
    padding: "2px 2px",
    cursor: "pointer",
    position: "fixed",
    zIndex: 100,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 30,
    borderRadius: "50%",
    // opacity: 0.7,
    "&:hover": {
      background: "orange",
      "& svg": {
        color: "#fff",
      },
    },
  },
  toggleBtnOpen: {
    top: 89,
    left: 284,
  },
  toggleBtnClose: {
    top: 89,
    left: 45,
  },
}));
export default Layout;
