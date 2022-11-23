import React, { useCallback, useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box, IconButton, Stack } from "@mui/material";
import FlipIcon from "@mui/icons-material/Flip";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { CardType } from "lib/types";

type PropTypes = {
  handleFlip: () => void;
  handleNext: () => void;
  handlePrevious: () => void;
  toggleRemember: (id: number) => void;
  currentCard: CardType | undefined;
  isAutoPlaying: boolean;
};

export default function Navigators({
  handleFlip,
  handleNext,
  handlePrevious,
  toggleRemember,
  currentCard,
  isAutoPlaying,
}: PropTypes) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isAutoPlaying) return;
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (event.key === "ArrowUp") {
        handleFlip();
      }
    },
    [handleNext, handlePrevious, handleFlip, isAutoPlaying]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return (
    <Box
      sx={{
        background: "",
        width: "800px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack direction="row" spacing={2} sx={{ padding: "10px" }}>
        <Box sx={{ background: "#fff" }}>
          <Stack direction="row" spacing={2}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              onClick={handlePrevious}
              sx={{ backgroundColor: "#fff" }}
              disabled={isAutoPlaying}
            >
              <KeyboardBackspaceIcon />
            </IconButton>

            <IconButton
              color="primary"
              onClick={() => handleFlip()}
              sx={{ backgroundColor: "#fff" }}
              disabled={isAutoPlaying}
            >
              <FlipIcon />
            </IconButton>

            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              onClick={handleNext}
              sx={{ backgroundColor: "#fff" }}
              disabled={isAutoPlaying}
            >
              <ArrowRightAltIcon />
            </IconButton>
          </Stack>
        </Box>
        <Box>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={() => toggleRemember(currentCard?.id as number)}
            sx={{ backgroundColor: "#fff" }}
            disabled={isAutoPlaying}
          >
            <CheckBoxIcon
              sx={{ background: "#fff" }}
              color={currentCard?.is_remembered ? "success" : "primary"}
            />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
}
