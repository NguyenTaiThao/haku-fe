import React, { useState, useEffect } from "react";
import {
  Drawer,
  IconButton,
  List,
  Divider,
  Collapse,
  SvgIcon,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useLocation, useHistory, Link } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";
import { sidebarWidth } from "../common/constant";
import { useTranslation } from "react-i18next";

const SideBar = React.memo((props: any) => {
  const classes = useStyle();
  const { sidebarList } = props;
  const theme = useTheme();
  const handleDrawerClose = () => {};
  const location = useLocation();
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleOpen = (e: any) => {
    if (open === e?.label) {
      setOpen(false);
    } else {
      props.setOpen(true);
      setOpen(e?.label);
    }
  };
  const handleOpen2 = (e: any) => {
    if (open2 === e?.label) {
      setOpen2(false);
    } else {
      props.setOpen(true);
      setOpen2(e?.label);
    }
  };

  useEffect(() => {
    if (!props.open) {
      setOpen(false);
    }
  }, [props.open]);
  useEffect(() => {
    if (!props.open2) {
      setOpen2(false);
    }
  }, [props.open2]);

  const active = (path: string) => {
    if (path) {
      const pathname = location.pathname.split("/");
      const p = path.split("/");
      if (pathname[1] === p[1]) {
        return true;
      }
    }
    return false;
  };

  const activeSubconmittee = (path: string) => {
    if (path) {
      const pathname = location.pathname.split("/");
      const p = path.split("/");
      for (let i = 1; i < p.length; i++) {
        if (p[i] !== pathname[i]) {
          return false;
        }
      }
      return true;
    }
    return false;
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: props.open,
        [classes.drawerClose]: !props.open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        }),
      }}
    >
      <div className={classes.toolbar} style={{ marginTop: 15 }}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />

      {sidebarList.map((c: any, index: number) => (
        <div key={index}>
          <List key={index} disablePadding={true}>
            {c?.path ? (
              <Link to={c?.path}>
                <ListItem
                  button={true}
                  className={
                    c.path
                      ? active(c.path)
                        ? classes.active
                        : classes.unactive
                      : classes.category
                  }
                  onClick={() => {
                    history.push(c.path);
                    handleOpen(c);
                  }}
                >
                  {c?.icon && (
                    <ListItemIcon
                      className={
                        active(c.path)
                          ? classes.activeCategoryIcon
                          : classes.categoryIcon
                      }
                    >
                      {c.icon}
                    </ListItemIcon>
                  )}
                  <ListItemText
                    style={{ textTransform: "uppercase", paddingLeft: 5 }}
                    primary={props.open ? t(c.label) : ""}
                  />
                </ListItem>
              </Link>
            ) : (
              <ListItem
                button={true}
                className={classes.category}
                onClick={() => {
                  if (c.onClick) {
                    c.onClick();
                  } else {
                    handleOpen(c);
                  }
                }}
              >
                {c?.icon && (
                  <ListItemIcon className={classes.categoryIcon}>
                    {c.icon}
                  </ListItemIcon>
                )}
                <ListItemText
                  style={{ textTransform: "uppercase", paddingLeft: 5 }}
                  primary={props.open ? c.label : ""}
                />
              </ListItem>
            )}

            <Collapse in={open === c.label}>
              {c?.children?.map((e: any, index1: number) => (
                <List key={index1} disablePadding={true}>
                  {e?.path ? (
                    <Link to={e?.path}>
                      <ListItem
                        button
                        key={index1}
                        title={e.label}
                        // onClick={() =>
                        //   e.path ? history.push(e.path) : handleOpen2(e)
                        // }
                        className={`${classes.item} ${
                          activeSubconmittee(e?.path)
                            ? classes.active
                            : classes.unactive
                        }`}
                      >
                        {/* <ListItemIcon>{e.icon}</ListItemIcon> */}
                        <SvgIcon>{/* <Circle /> */}</SvgIcon>
                        <ListItemText
                          primary={props.open ? e.label : ""}
                          style={{ paddingLeft: 5 }}
                        />
                      </ListItem>
                    </Link>
                  ) : (
                    <ListItem
                      button
                      key={index1}
                      title={e.label}
                      onClick={() => handleOpen2(e)}
                      className={`${classes.item} ${
                        active(e?.path) ? classes.active : classes.unactive
                      }`}
                    >
                      {/* <ListItemIcon>{e.icon}</ListItemIcon> */}
                      <SvgIcon>{/* <Circle /> */}</SvgIcon>
                      <ListItemText
                        primary={props.open ? e.label : ""}
                        style={{ paddingLeft: 5 }}
                      />
                    </ListItem>
                  )}
                  <Collapse in={open2 === e.label} timeout="auto" unmountOnExit>
                    {e?.children?.map((d: any, index2: number) => (
                      <Link to={d?.path} key={index2}>
                        <ListItem
                          button
                          title={d.label}
                          className={`${classes.itemLv2} ${
                            activeSubconmittee(d.path)
                              ? classes.active
                              : classes.unactive
                          }`}
                          onClick={() =>
                            d.path ? history.push(d.path) : handleOpen2(d)
                          }
                        >
                          {/* <ListItemIcon style={{ minWidth: 30 }}>
                                {d.icon}
                              </ListItemIcon> */}
                          <SvgIcon>{/* <Dot /> */}</SvgIcon>
                          <ListItemText
                            primary={d.label}
                            style={{ paddingLeft: 5 }}
                          />
                        </ListItem>
                      </Link>
                    ))}
                  </Collapse>
                </List>
              ))}
            </Collapse>
          </List>
          <Divider />
        </div>
      ))}
    </Drawer>
  );
});

const useStyle = makeStyles((theme) => ({
  drawer: {
    width: sidebarWidth,
    flexShrink: 0,
    fontSize: "1rem",
    "& svg": {
      color: theme.palette.primary,
    },
    "& a": {
      color: "#000",
      textDecoration: "none",
    },
  },
  drawerOpen: {
    width: sidebarWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 60,
    [theme.breakpoints.up("sm")]: {
      width: 60,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  active: {
    minHeight: 48,
    background: "#F3F5FF",
    borderBottom: "#f3f3f3 solid 1px",
    color: "#0052cc",
  },
  unactive: {
    minHeight: 48,
    background: "#fff",
    borderBottom: "#f3f3f3 solid 1px",
    color: "#42526E",
  },
  category: {
    minHeight: 50,
    textTransform: "uppercase",
    borderBottom: "#f3f3f3 solid 1px",
    color: "#42526E",
  },
  categoryIcon: {
    color: "#000",
    minWidth: 40,
  },
  activeCategoryIcon: {
    color: "#0052cc",
    minWidth: 40,
  },
  item: {
    paddingLeft: 30,
    "& svg": {
      color: "#e0481ade",
    },
  },
  itemLv2: {
    paddingLeft: 50,
    "& svg": {
      color: "#07b41591",
    },
  },
  itemLv3: {
    paddingLeft: 50,
    "& svg": {
      color: "#07b41591",
    },
  },
}));
export default SideBar;
