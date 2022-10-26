import { Box, BoxProps } from "@mui/material";
import { RefObject } from "react";
import React from "react";

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  boxProps?: BoxProps;
  innerRef?: RefObject<HTMLDivElement>;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, boxProps, innerRef, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      ref={innerRef}
    >
      {value === index && (
        <Box sx={{ p: 2 }} {...boxProps}>
          {children}
        </Box>
      )}
    </div>
  );
}

export function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}
