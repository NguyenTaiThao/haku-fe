import { Paper, PaperProps, Stack, Typography } from "@mui/material";
import React from "react";

type PageProps = {
  title?: string;
  leftHeader?: React.ReactNode;
} & PaperProps;

const Page: React.FC<PageProps> = ({
  children,
  title,
  leftHeader,
  ...paperProps
}) => {
  return (
    <Paper square elevation={3} sx={{ p: 3 }} {...paperProps}>
      {title && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={{ md: 6 }}
        >
          <Typography variant="h4">{title}</Typography>

          {leftHeader}
        </Stack>
      )}
      {children}
    </Paper>
  );
};

export { Page };
