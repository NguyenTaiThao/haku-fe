import { Box, Grid, Stack, styled, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { QuestionType } from "lib/types";

const BG_COLOR = {
  NULL: "#fff",
  CORRECT: "#4caf50",
  WRONG: "#f44336",
};

export default function Question({
  questions,
  index,
  handleNextQuestion,
  setPoints,
}: {
  questions: QuestionType[];
  index: number;
  handleNextQuestion: () => void;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [bgColors, setBgColors] = useState<string[]>([
    BG_COLOR.NULL,
    BG_COLOR.NULL,
    BG_COLOR.NULL,
    BG_COLOR.NULL,
  ]);
  const questionNth = index + 1;
  const question = questions?.[index];

  const handleSelectAnswer = (index: number) => {
    setSelected(index);
    if (question?.correct_index === index) {
      setPoints((points) => points + 1);
    }
    setTimeout(() => {
      setSelected(null);
      handleNextQuestion();
    }, 1000);
  };

  const getBackgroundColor = useCallback(
    (index: number) => {
      if (selected === null) return BG_COLOR.NULL;
      if (selected === index) {
        if (question?.correct_index === index) return BG_COLOR.CORRECT;
        return BG_COLOR.WRONG;
      }
      if (question?.correct_index === index) return BG_COLOR.CORRECT;
      return BG_COLOR.NULL;
    },
    [selected, question]
  );

  useEffect(() => {
    if (selected === null) {
      setBgColors([BG_COLOR.NULL, BG_COLOR.NULL, BG_COLOR.NULL, BG_COLOR.NULL]);
    } else {
      setBgColors([
        getBackgroundColor(0),
        getBackgroundColor(1),
        getBackgroundColor(2),
        getBackgroundColor(3),
      ]);
    }
  }, [selected, setBgColors, getBackgroundColor]);

  return (
    <Box>
      <Grid container sx={{ width: 1000 }}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4">
              {questionNth}. {question?.question}?
            </Typography>
            <Typography variant="h5">
              ({questionNth}/{questions.length})
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} sx={{ mt: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <StyledCard
                variant="outlined"
                onClick={() => handleSelectAnswer(0)}
                sx={{
                  backgroundColor: `${bgColors[0]} ${
                    selected !== null && "!important"
                  }`,
                }}
              >
                <Typography variant="h6">{question?.answers?.[0]}</Typography>
              </StyledCard>
            </Grid>
            <Grid item xs={6}>
              <StyledCard
                variant="outlined"
                onClick={() => handleSelectAnswer(1)}
                sx={{
                  backgroundColor: `${bgColors[1]} ${
                    selected !== null && "!important"
                  }`,
                }}
              >
                <Typography variant="h6">{question?.answers?.[1]}</Typography>
              </StyledCard>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={6}>
              <StyledCard
                variant="outlined"
                onClick={() => handleSelectAnswer(2)}
                sx={{
                  backgroundColor: `${bgColors[2]} ${
                    selected !== null && "!important"
                  }`,
                }}
              >
                <Typography variant="h6">{question?.answers?.[2]}</Typography>
              </StyledCard>
            </Grid>
            <Grid item xs={6}>
              <StyledCard
                variant="outlined"
                onClick={() => handleSelectAnswer(3)}
                sx={{
                  backgroundColor: `${bgColors[3]} ${
                    selected !== null && "!important"
                  }`,
                }}
              >
                <Typography variant="h6">{question?.answers?.[3]}</Typography>
              </StyledCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  height: 150,
  padding: theme.spacing(2, 2),
  "&:hover": {
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
