import { Box } from "@mui/material";
import React from "react";

type PropTypes = {
  position: number;
  total: number;
};

export default function CardNumber({ position, total }: PropTypes) {
  return (
    <Box sx={{ textAlign: "center", color: "white" }}>
      {position}/{total}
    </Box>
  );
}
