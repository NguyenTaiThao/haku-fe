import React, { useState, Suspense, useEffect } from "react";
import SideBar from "../../components/SideBar";
import { Route, Switch } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/styles";
import AppLoading from "../../components/Loading";
import { UserRoutes } from "../../routes/UserRoutes";
import HomeIcon from "@material-ui/icons/Home";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { sidebarWidth } from "../../common/constant";
import clsx from "clsx";
import { Paper } from "@material-ui/core";
import Header from "./Header";
import NoMatch from "containers/NoMatch";

const Layout = React.memo((props) => {
  const [open, setOpen] = useState(
    localStorage.getItem("sidebar")
      ? JSON.parse(localStorage.getItem("sidebar") as string)
      : false
  );
  useEffect(() => {
    localStorage.setItem("sidebar", open);
  }, [open]);
  const [path, setPath] = useState("");
  const { userRoutes } = UserRoutes();
  const classes = useStyle();

  const sidebarUser = [
    {
      label: "Home",
      icon: <HomeIcon />,
      perm: "",
      path: "/",
    },
  ];

  const sidebarList = () => {
    return sidebarUser;
  };

  function render(route: any) {
    return (
      <Route
        path={route.path}
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
        <Suspense fallback={<AppLoading />}>
          <Switch>
            {userRoutes.map((e) => render(e))}{" "}
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
