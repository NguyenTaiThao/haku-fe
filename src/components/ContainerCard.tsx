import { makeStyles } from "@material-ui/styles";
import { Stack } from "@mui/material";
import React, { ReactNode } from "react";
import background from "../assets/image/background.png";
import backgroundLogin from "../assets/image/background-tab-log.png";

interface Props {
  children: ReactNode;
  minHeight: string;
  width: string;
  margin: string;
  padding?: string;
}

export const ContainerCard: React.FC<Props> = ({
  children,
  minHeight,
  width,
  margin,
  padding,
}) => {
  const classes = useStyle();
  return (
    <Stack
      className={classes.containerInfo}
      style={{
        minHeight: minHeight,
        width: width,
        margin: margin,
        padding: padding ? padding : "0px",
      }}
    >
      {children}
    </Stack>
  );
};

const useStyle = makeStyles(() => ({
  containerInfo: {
    backgroundImage: `url(${backgroundLogin}), url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundBlendMode: "color-dodge",
    borderRadius: "12px",
  },
}));
