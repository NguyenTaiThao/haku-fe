import React, { useCallback, useEffect } from "react";
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

  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      handleNext();
    }
    else if (event.key === "ArrowLeft") {
      handlePrevious();
    }
    else if (event.key === "ArrowUp") {
      handleFlip();
    }
  },[handleNext, handlePrevious, handleFlip])
  
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    }
  },[handleKeyDown])

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          onClick={handlePrevious}
          sx={{ backgroundColor: "#fff" }}
        >
          <KeyboardBackspaceIcon />
        </IconButton>

        <IconButton
          color="primary"
          onClick={() => handleFlip()}
          sx={{ backgroundColor: "#fff" }}
        >
          <FlipIcon />
        </IconButton>

        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          onClick={handleNext}
          sx={{ backgroundColor: "#fff" }}
        >
          <ArrowRightAltIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
