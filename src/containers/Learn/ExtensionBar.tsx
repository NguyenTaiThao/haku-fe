import {
  Box,
  Button,
  CircularProgress,
  CircularProgressProps,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import QuizIcon from "@mui/icons-material/Quiz";

type ProsType = {
  handleShuffle?: () => void;
  handlePlay?: () => void;
  handleQuiz?: () => void;
  isRunning: boolean;
};

export default function ExtensionBar({
  handleShuffle,
  handlePlay,
  handleQuiz,
  isRunning,
}: ProsType) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>Set 1</h2>
      <Typography variant="body1" sx={{ pb: 5 }}>
        this is a description
      </Typography>
      <CircularProgressWithLabel value={100}></CircularProgressWithLabel>

      <Stack sx={{ mt: 10 }} spacing={2}>
        <Button variant="outlined" onClick={handleShuffle} disabled={isRunning}>
          <ShuffleIcon sx={{ mr: 1 }} />
          Shuffle
        </Button>
        <Button variant="outlined" disabled={isRunning}>
          <PlayArrowIcon sx={{ mr: 1 }} />
          Auto Play
        </Button>
        <Button variant="outlined" disabled={isRunning}>
          <QuizIcon sx={{ mr: 1 }} />
          Quiz Game
        </Button>
      </Stack>
    </Box>
  );
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        color="success"
        variant="determinate"
        size={150}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.success"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
