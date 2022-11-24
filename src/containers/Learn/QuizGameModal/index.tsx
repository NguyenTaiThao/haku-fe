import { DialogBase } from "components/Dialog";
import React, { useEffect, useState } from "react";
import { QuestionType, QuestionTypeRes } from "lib/types";
import { useQuery } from "react-query";
import QuizGameScreen from "./QuizGame";
import PreStartScreen from "./PreStart";
import ResultScreen from "./Result";

type PropTypes = {
  isOpen: boolean;
  onClose: () => void;
  cardNumber?: number;
  setId: number;
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
  setId,
}: PropTypes) {
  const [questionNum, setQuestionNum] = useState(0);
  const [points, setPoints] = useState(0);
  const [stage, setStage] = useState(STAGES.finished);
  const [questions, setQuestion] = useState<QuestionType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: questionsData, isFetching } = useQuery<QuestionTypeRes>(
    `quiz-game/${setId}?question_num=${questionNum}`,
    {
      refetchOnMount: true,
      enabled: stage === STAGES.started && questionNum > 0,
    }
  );

  useEffect(() => {
    if (questionsData) {
      setQuestion(questionsData.data);
    }
  }, [questionsData]);

  useEffect(() => {
    setQuestionNum(cardNumber);
  }, [cardNumber]);

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setStage(STAGES.preStart);
    setQuestionNum(cardNumber);
    setCurrentIndex(0);
    setPoints(0);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStage(STAGES.finished);
    }
  };

  const handleStart = () => {
    setStage(STAGES.started);
  };

  return (
    <DialogBase
      open={isOpen}
      onClose={handleClose}
      title="Quiz Game"
      fullScreen
      fullHeight
      disableEscapeKeyDown
    >
      {stage === STAGES.preStart && (
        <PreStartScreen
          questionNum={questionNum}
          maxQuestionNum={cardNumber * 2}
          setQuestionNum={setQuestionNum}
          handleStart={handleStart}
        />
      )}

      {stage === STAGES.started && (
        <QuizGameScreen
          isFetching={isFetching}
          questions={questions}
          handleNextQuestion={handleNextQuestion}
          index={currentIndex}
          setPoints={setPoints}
        />
      )}

      {stage === STAGES.finished && (
        <ResultScreen
          points={points}
          questionNum={questionNum}
          handleClose={handleClose}
          handleReset={handleReset}
        />
      )}
    </DialogBase>
  );
}
