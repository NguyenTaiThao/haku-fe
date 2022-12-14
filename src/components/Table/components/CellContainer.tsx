import { Stack, StackProps } from "@mui/material";
import React from "react";

const CellContainer: React.FC<StackProps> = ({ children, ...stackProps }) => {
  return (
    <Stack {...stackProps} onClick={(e) => e.stopPropagation()}>
      {children}
    </Stack>
  );
};

export { CellContainer };
