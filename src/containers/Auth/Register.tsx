import React, { useContext, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { useAPI } from "api/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "containers/AuthProvider";
import { Input } from "components/Form";
import {
  Box,
  Button,
  Card,
  FormHelperText,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface Error {
  status: number;
  data: {
    message: string;
  };
}

const useStyle = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    background: "#efebe9",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    minHeight: "585px",
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url("/images/bg.png")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    alignContent: "center",
    [theme.breakpoints.up("lg")]: {
      height: "100%",
      width: "100%",
      padding: "0px calc(5% - 420px/2 + 270px)",
    },
    [theme.breakpoints.down("lg")]: {
      height: "100%",
      width: "100%",
      padding: "0px calc(5% - 420px/2 + 200px)",
    },
    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
      padding: "0px calc(5% - 420px/2 + 200px)",
    },
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      width: "100%",
      padding: "10px",
    },
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  contentRight: {
    padding: "64px 24px",
    borderRadius: 14,
    maxHeight: 630,
    position: "absolute",
    display: "flex",
    flexFlow: "column",
    [theme.breakpoints.up("lg")]: {},
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "100%",
      borderRadius: 0,
      justifyContent: "center",
    },
    boxShadow: "0px 0px 30px #1c2f54",
  },
  tab: {
    width: "50%",
    fontWeight: "bold",
    background: "#ffffffc7",
  },
  tabActive: {
    background: "#0a49ed91",
    "-webkit-transition": "background-color 1000ms linear",
    "-moz-transition": "background-color 1000ms linear",
    "-o-transition": "background-color 1000ms linear",
    "-ms-transition": "background-color 1000ms linear",
    transition: "background-color 1000ms linear",
    color: "white",
  },
}));

type credential = {
  email: string;
  password: string;
};

export default function Register() {
  const classes = useStyle();
  const history = useHistory();
  const api = useAPI();
  const { admin } = useContext(AuthContext);
  const [error, setError] = useState("");
  useEffect(() => {
    if (admin) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin]);

  const { updateAdminToken, updateAdmin } = useContext(AuthContext);
  const { t } = useTranslation();

  const schema = useMemo(
    () =>
      yup.object({
        email: yup.string().required(t("error.required")),
        password: yup.string().required(t("error.required")),
        repassword: yup
          .string()
          .required(t("error.required"))
          .oneOf([yup.ref("password"), null], t("error.password_confirmation")),
      }),
    [t]
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      repassword: "",
    },
  });

  const register = async (values: credential) => {
    try {
      const res = await api.fetcher("post", "/register", {
        email: values.email,
        password: values.password,
      });
      if (res) {
        updateAdmin(res.user);
        updateAdminToken(res.access_token);
      }
    } catch (e) {
      const error = e as Error;
      if (error?.status === 422) {
        setError(t("error.email_already_exists"));
      }
    }
  };

  return (
    <div
      style={{
        padding: 0,
        maxWidth: "100vw",
        height: "100%",
        background: "#efebe9",
      }}
    >
      <div style={{ height: "100%", background: "#efebe9" }}>
        <div className={classes.container}>
          <Card className={classes.content}>
            <div className={classes.contentRight}>
              <Stack alignItems="center" spacing={3} mb={2}></Stack>
              <Box
                component="form"
                onSubmit={handleSubmit(register)}
                noValidate
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Input
                      fullWidth
                      name="email"
                      label={t("auth.email")}
                      control={control}
                      sx={{
                        backgroundColor: "#000",
                        color: "#fff",
                        border: "1px solid #BDBDBD",
                        borderRadius: "8px",
                      }}
                      controlProps={{
                        sx: {
                          "&& .MuiFormLabel-root": {
                            color: "#fff",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      fullWidth
                      name="password"
                      label={t("auth.password")}
                      type="password"
                      control={control}
                      sx={{
                        backgroundColor: "#000",
                        color: "#fff",
                        border: "1px solid #BDBDBD",
                        borderRadius: "8px",
                        "&& .MuiSvgIcon-root": {
                          color: "#fff",
                        },
                      }}
                      controlProps={{
                        sx: {
                          "&& .MuiFormLabel-root": {
                            color: "#fff",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      fullWidth
                      name="repassword"
                      label={t("auth.password_confirmation")}
                      type="password"
                      control={control}
                      sx={{
                        backgroundColor: "#000",
                        color: "#fff",
                        border: "1px solid #BDBDBD",
                        borderRadius: "8px",
                        "&& .MuiSvgIcon-root": {
                          color: "#fff",
                        },
                      }}
                      controlProps={{
                        sx: {
                          "&& .MuiFormLabel-root": {
                            color: "#fff",
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid>
                  <FormHelperText error={!!error}>{error}</FormHelperText>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 32 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    style={{
                      backgroundColor: "#00F0FF",
                      fontWeight: 700,
                      borderRadius: 12,
                      padding: 10,
                      color: "#000",
                      marginTop: 18,
                    }}
                  >
                    {t("auth.register")}
                  </Button>
                </Grid>
                <Grid mt={5}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                    style={{ color: "#fff" }}
                  >
                    {t("auth.already_registered")}
                    <Link to="/login" style={{ color: "#00F0FF" }}>
                      {t("auth.here")}
                    </Link>
                  </Typography>
                </Grid>
              </Box>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
