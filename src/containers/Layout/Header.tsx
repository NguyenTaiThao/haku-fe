import React, { useContext, useEffect, useMemo, useState } from "react";
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
import { useTranslation } from "react-i18next";
import EN from "../../assets/flag/uk-flag.png";
import JP from "../../assets/flag/jp-flag.png";
import VI from "../../assets/flag/vi-flag.png";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

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
  const [anchorEl1, setAnchorEl1] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handlePopoverOpen1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  const handlePopoverClose1 = () => {
    setAnchorEl1(null);
  };

  const open1 = Boolean(anchorEl1);

  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState<string>(
    i18n.language ? i18n.language : "en"
  );

  const flag = useMemo(() => {
    if (language === "en") return EN;
    if (language === "jp") return JP;
    if (language === "vi") return VI;
  }, [language]);

  const changeLocation = (value: string) => {
    i18n.changeLanguage(value);
    localStorage.setItem("lang", value);
    setLanguage(value);
    handlePopoverClose();
  };

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
          <Stack direction="row">
            <div
              style={{
                borderRadius: theme.spacing(1),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: theme.spacing(1, 2),
                height: theme.spacing(6),
                border: "white solid 1px",
                marginRight: "10px",
              }}
              onClick={(e) => {
                handlePopoverOpen(e);
              }}
            >
              <img
                src={flag}
                height={32}
                width="auto"
                alt=""
                style={{ marginRight: "10px" }}
              />
              <ArrowDropDownIcon />
            </div>
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
                onClick={(e) => handlePopoverOpen1(e)}
              >
                <IconButton color="inherit">
                  <AccountCircleIcon />
                </IconButton>

                <Typography>{admin.email}</Typography>
              </Stack>
            </Box>
            <Popover
              id="mouse-over-popover"
              open={open1}
              anchorEl={anchorEl1}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              onClose={handlePopoverClose1}
              disableRestoreFocus
            >
              <Typography style={{ padding: 8 }} onClick={() => logout()}>
                Logout
              </Typography>
            </Popover>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={() => handlePopoverClose()}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                  padding: "10px",
                  width: "150px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundBlendMode: "color-dodge",
                }}
                spacing={2}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  sx={{ width: "100%" }}
                  onClick={() => changeLocation("en")}
                >
                  <img src={EN} height={32} width="auto" alt="" />
                  <p>English</p>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  sx={{ width: "100%" }}
                  onClick={() => changeLocation("jp")}
                >
                  <img src={JP} height={32} width="auto" alt="" />
                  <p>日本語</p>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  sx={{ width: "100%" }}
                  onClick={() => changeLocation("vi")}
                >
                  <img src={VI} height={32} width="auto" alt="" />
                  <p>Tiếng Việt</p>
                </Stack>
              </Stack>
            </Popover>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
}
