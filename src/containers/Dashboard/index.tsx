import { Stack } from "@mui/material";
import React from "react";
import { StatisticCard } from "./StatisticCard";

export const Dashboard: React.FC = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <StatisticCard />
    </Stack>
  );
};
