import { Box, Button, Slider, styled, Typography } from "@mui/material";
import React from "react";

export default function PreStartScreen({
  questionNum,
  maxQuestionNum,
  setQuestionNum,
  handleStart,
}: {
  questionNum: number;
  maxQuestionNum: number;
  setQuestionNum: React.Dispatch<React.SetStateAction<number>>;
  handleStart: () => void;
}) {
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
      <h1>Wellcome to Quiz Game</h1>
      <Typography variant="overline">
        Please select number of question: {questionNum}
      </Typography>
      <PrettoSlider
        valueLabelDisplay="on"
        value={questionNum}
        max={maxQuestionNum}
        sx={{ mt: 5 }}
        onChange={(e, value) => setQuestionNum(value as number)}
      />
      <Button
        variant="contained"
        disabled={questionNum <= 0}
        onClick={() => handleStart()}
        sx={{ mt: 5, width: 200, height: 90 }}
      >
        Start
      </Button>
    </Box>
  );
}

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});
