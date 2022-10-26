import React from "react";
import { Box, BoxProps, styled } from "@mui/material";

const MinimizeScrollbarContainer = styled(Box)(({ theme }) => ({
  "&::-webkit-scrollbar": {
    width: 6,
    height: 6,
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
    borderRadius: 3,
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.grey[400],
    borderRadius: 3,
  },
}));

type MinimizeScrollbarProps = {
  contentProps?: BoxProps;
} & BoxProps;

const MinimizeScrollbar: React.FC<MinimizeScrollbarProps> = ({
  children,
  contentProps,
  ...props
}) => {
  return (
    <Box {...props}>
      <MinimizeScrollbarContainer
        p={1}
        width="100%"
        height="100%"
        overflow="auto"
        {...contentProps}
      >
        {children}
      </MinimizeScrollbarContainer>
    </Box>
  );
};

export { MinimizeScrollbar, MinimizeScrollbarContainer };
