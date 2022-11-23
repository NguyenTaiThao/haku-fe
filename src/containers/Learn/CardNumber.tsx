import { Box, LinearProgress } from "@mui/material";
import React from "react";

type PropTypes = {
  position: number;
  total: number;
};

export default function CardNumber({ position, total }: PropTypes) {
  const percentage = (position / total) * 100;

  return (
    <Box sx={{ textAlign: "center", color: "white", width: "200px" }}>
      {position}/{total}
      <LinearProgress variant="determinate" color='success' value={percentage} />
    </Box>
  );
}
