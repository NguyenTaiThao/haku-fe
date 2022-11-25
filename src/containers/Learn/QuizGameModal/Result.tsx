import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const percentage = Math.floor((points / questionNum) * 10 ** 4) / 100;
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
        {t("learn.your_score")}: {points}/{questionNum} ({percentage}%)
      </Typography>
      {isPassed ? (
        <Typography variant="h4">
          {t("learn.passed_message")}{" "}
          <span role="img" aria-label="">
            🚀🚀
          </span>
        </Typography>
      ) : (
        <Typography variant="h4">
          {t("learn.failed_message")}{" "}
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
          {t("learn.exit")}
        </Button>
        <Button
          variant="contained"
          onClick={handleRestart}
          sx={{ mt: 5, width: 200, height: 60 }}
        >
          {t("learn.try_again")}
        </Button>
      </Stack>
    </Box>
  );
}
