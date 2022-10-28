import { Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CardCreator(props: {
  index: number;
  front: string;
  back: string;
  addCard(front: string, back: string): void;
  editCard(index: number, front: string, back: string): void;
  removeCard(index: number): void;
}) {
  const { addCard, back, editCard, front, index, removeCard } = props;

  return (
    <Box
      px={5}
      pb={4}
      pt={2}
      sx={{
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 3,
        borderColor: "#e0e0e0",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Grid container columnSpacing={5}>
        <Grid item xs={12} mb={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1">{index + 1}</Typography>
            <IconButton onClick={() => removeCard(index)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Enter content of card front"
            value={front}
            onChange={(e) => editCard(index, e.target.value, back)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Enter content of card back"
            value={back}
            onChange={(e) => editCard(index, front, e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
