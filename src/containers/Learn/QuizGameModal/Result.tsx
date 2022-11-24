import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const PASS_PERCENTAGE = 80;

export default function ResultScreen({
  points,
  questionNum,
  handleClose,
  handleReset,
}: {
  points: number;
  questionNum: number;
  handleClose: () => void;
  handleReset: () => void;
}) {
  const percentage = (points / questionNum) * 100;
  const isPassed = percentage > PASS_PERCENTAGE;

  const handleRestart = () => {
    handleReset();
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        px: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" sx={{ mb: 5 }}>
        <span role="img" aria-label="">
          🔥
        </span>
        Your point: {points}/{questionNum} ({percentage}%)
      </Typography>
      {isPassed ? (
        <Typography variant="h4">
          Good job{" "}
          <span role="img" aria-label="">
            🚀🚀
          </span>
        </Typography>
      ) : (
        <Typography variant="h4">
          Let's try once a gain{" "}
          <span role="img" aria-label="">
            💪💪
          </span>
        </Typography>
      )}
      <Stack direction="row" sx={{ mt: 5 }}>
        <Button
          variant="outlined"
          onClick={() => handleClose()}
          sx={{ mt: 5, width: 200, height: 60, mr: 5 }}
        >
          Back to home
        </Button>
        <Button
          variant="contained"
          onClick={handleRestart}
          sx={{ mt: 5, width: 200, height: 60 }}
        >
          Try again
        </Button>
      </Stack>
    </Box>
  );
}
