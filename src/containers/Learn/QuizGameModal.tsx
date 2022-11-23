import { Box, Button, Slider, Stack, styled, Typography } from "@mui/material";
import { DialogBase } from "components/Dialog";
import React, { useState } from "react";

type PropTypes = {
  isOpen: boolean;
  onClose: () => void;
  cardNumber?: number;
};

const STAGES = {
  preStart: 1,
  started: 2,
  finished: 3,
};

export default function QuizGameModal({
  isOpen,
  onClose,
  cardNumber = 0,
}: PropTypes) {
  const [questionNum, setQuestionNum] = useState(cardNumber);
  const [stage, setStage] = useState(STAGES.preStart);

  return (
    <DialogBase
      open={isOpen}
      onClose={onClose}
      title="Quiz Game"
      fullScreen
      fullHeight
      disableEscapeKeyDown
    >
      {stage === 1 && (
        <PreStartScreen
          questionNum={questionNum}
          maxQuestionNum={cardNumber * 2}
          setQuestionNum={setQuestionNum}
        />
      )}
    </DialogBase>
  );
}

const PreStartScreen = ({
  questionNum,
  maxQuestionNum,
  setQuestionNum,
}: {
  questionNum: number;
  maxQuestionNum: number;
  setQuestionNum: React.Dispatch<React.SetStateAction<number>>;
}) => {
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
        sx={{ mt: 5, width: 200, height: 90 }}
      >
        Start
      </Button>
    </Box>
  );
};

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
