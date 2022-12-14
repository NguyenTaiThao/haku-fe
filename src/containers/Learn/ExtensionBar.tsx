import {
  Box,
  Button,
  CircularProgress,
  CircularProgressProps,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import QuizIcon from "@mui/icons-material/Quiz";
import StopIcon from "@mui/icons-material/Stop";
import { SetType } from "lib/types";
import { useTranslation } from "react-i18next";

type ProsType = {
  handleShuffle?: () => void;
  handleAutoPlay: () => () => void;
  handleQuiz: () => void;
  isRunning: boolean;
  setInfo: SetType | undefined;
  progress: number;
  isAutoPlaying: boolean;
  setIsAutoPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ExtensionBar({
  handleShuffle,
  handleAutoPlay,
  handleQuiz,
  isRunning,
  setInfo,
  progress,
  isAutoPlaying,
  setIsAutoPlaying,
}: ProsType) {
  const { t } = useTranslation();
  const [clearInterval, setClearInterval] = useState<() => void>(
    () => () => {}
  );

  const startAutoPlay = () => {
    setIsAutoPlaying(true);
    const clearer = handleAutoPlay();
    setClearInterval(() => clearer);
  };

  const stopAutoPlay = () => {
    clearInterval();
    setIsAutoPlaying(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>{setInfo?.name}</h2>
      <Typography variant="body1" sx={{ pb: 5 }}>
        {setInfo?.description}
      </Typography>
      <CircularProgressWithLabel value={progress}></CircularProgressWithLabel>

      <Stack sx={{ mt: 10 }} spacing={2}>
        <Button
          variant="outlined"
          onClick={handleShuffle}
          disabled={isRunning || isAutoPlaying}
        >
          <ShuffleIcon sx={{ mr: 1 }} />
          {t("learn.shuffle")}
        </Button>
        <Button
          variant="outlined"
          disabled={isRunning}
          onClick={isAutoPlaying ? stopAutoPlay : startAutoPlay}
        >
          {isAutoPlaying ? (
            <StopIcon sx={{ mr: 1 }} />
          ) : (
            <PlayArrowIcon sx={{ mr: 1 }} />
          )}
          {isAutoPlaying ? t("learn.stop") : t("learn.auto_play")}
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleQuiz()}
          disabled={
            isRunning || isAutoPlaying || Number(setInfo?.card_count) <= 4
          }
        >
          <QuizIcon sx={{ mr: 1 }} />
          {t("learn.quiz")}
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
