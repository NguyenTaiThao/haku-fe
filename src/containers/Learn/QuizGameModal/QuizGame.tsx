import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { QuestionType } from "lib/types";
import Question from "./Question";

export default function QuizGameScreen({
  isFetching,
  questions,
  handleNextQuestion,
  index,
  setPoints,
}: {
  isFetching: boolean;
  questions: QuestionType[];
  handleNextQuestion: () => void;
  index: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
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
      {isFetching && <CircularProgress />}
      {!isFetching && (
        <Question
          questions={questions}
          index={index}
          handleNextQuestion={handleNextQuestion}
          setPoints={setPoints}
        />
      )}
    </Box>
  );
}
