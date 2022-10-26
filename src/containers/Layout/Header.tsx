import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { AuthContext } from "../AuthProvider";
import { useHistory } from "react-router-dom";
import color from "../../common/color.json";
import { IconButton, Popover, Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Box, Stack, useTheme } from "@mui/material";

const drawerWidth = 260;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: color.primary,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: "100%",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  leftBar: {
    display: "flex",
    alignItems: "center",
  },
  breadcrumbs: {
    paddingLeft: 30,
  },
  menuButton: {
    marginRight: 36,
  },
  icon: {
    justifyContent: "flex-end",
  },
  rightBar: {
    display: "flex",
    "& svg": {
      fontSize: "2rem",
      width: "2rem",
      height: "2rem",
    },
  },
  showHeader: {
    [theme.breakpoints.down("sm")]: {
      display: "none !important",
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
  },
}));

export default function Header(props: any) {
  const classes = useStyles();
  const { admin, clear }: any = useContext(AuthContext);
  const name = () => {
    if (admin) {
      return admin.name;
    }
    return null;
  };
  const history = useHistory();
  const logout = () => {
    if (admin) {
      clear();
      history.push("/login");
    }
  };
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (window.screen.width > 1000) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.open,
        })}
      >
        <Toolbar
          className={classes.toolbar}
          style={{
            height: "80px",
            backgroundColor: "#1C1C33",
            backgroundImage: `url("/images/bg.png")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            padding: "0px",
          }}
        >
          <div className={classes.leftBar} style={{ paddingLeft: 15 }}>
            {show === true && (
              <Stack direction="row" alignItems="center" spacing={2}></Stack>
            )}
          </div>
          <Stack>
            <Box
              style={{
                borderRadius: theme.spacing(1),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: theme.spacing(1, 2),
                height: theme.spacing(6),
                border: "1px solid",
                marginRight: 30,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                onClick={(e) => handlePopoverOpen(e)}
              >
                <IconButton color="inherit">
                  <AccountCircleIcon />
                </IconButton>

                <Typography>{admin.email}</Typography>
              </Stack>
            </Box>
            <Popover
              id="mouse-over-popover"
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography style={{ padding: 8 }} onClick={() => logout()}>
                Logout
              </Typography>
            </Popover>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
}
