import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box, IconButton, Stack } from "@mui/material";
import FlipIcon from "@mui/icons-material/Flip";

type PropTypes = {
  handleFlip: () => void;
  handleNext: () => void;
  handlePrevious: () => void;
};

export default function Navigators({
  handleFlip,
  handleNext,
  handlePrevious,
}: PropTypes) {
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          onClick={handlePrevious}
        >
          <KeyboardBackspaceIcon />
        </IconButton>

        <IconButton color="primary" onClick={() => handleFlip()}>
          <FlipIcon />
        </IconButton>

        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          onClick={handleNext}
        >
          <ArrowRightAltIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
