import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useAPI } from "api/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "containers/AuthProvider";
import { Input } from "components/Form";
import { Box, Button, Card, FormHelperText, Grid, Stack } from "@mui/material";

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

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

export default function Login() {
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = async (values: credential) => {
    try {
      const res = await api.fetcher("post", "/login", {
        email: values.email,
        password: values.password,
      });
      if (res) {
        updateAdmin(res.user);
        updateAdminToken(res.access_token);
      }
    } catch (e) {
      const error = e as Error;
      if (error?.status === 401) {
        setError(error?.data?.message);
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
                onSubmit={handleSubmit(login)}
                noValidate
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Input
                      fullWidth
                      name="email"
                      label="Email"
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
                      label="Password"
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
                    Login
                  </Button>
                </Grid>
              </Box>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
