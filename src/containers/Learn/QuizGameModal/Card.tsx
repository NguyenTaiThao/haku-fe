// @ts-nocheck
import {
  Box,
  Slide,
  Stack,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { CardType } from "lib/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { FILTER } from "..";

type PropTypes = {
  setHandleFlip: Dispatch<SetStateAction<() => void>>;
  card: CardType | undefined;
  cards: CardType[] | undefined;
  setFilter: Dispatch<SetStateAction<number>>;
  filter: number;
};

export default function Card({
  setHandleFlip,
  card,
  cards,
  setFilter,
  filter,
}: PropTypes) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = useCallback(() => {
    setIsFlipped((value) => !value);
    return true;
  }, [setIsFlipped]);

  useEffect(() => setHandleFlip(() => handleFlip), [setHandleFlip, handleFlip]);

  useEffect(() => {
    if (isFlipped) {
      setIsFlipped(false);
    }
  }, [card]);

  const getFlipStatus = (id: number) => {
    if (id === card?.id) {
      return isFlipped;
    } else {
      return false;
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          sx={{
            position: "relative",
            width: "800px",
            height: "500px",
          }}
        >
          {cards &&
            cards.map((item) => (
              <Slide
                direction="left"
                in={item?.id === card?.id}
                mountOnEnter
                unmountOnExit
                sx={{ position: "absolute", left: "0px" }}
              >
                <Box>
                  <Flippy
                    flipOnHover={false}
                    flipOnClick={false}
                    flipDirection="horizontal"
                    isFlipped={getFlipStatus(item.id)}
                    style={{
                      width: "800px",
                      height: "500px",
                    }}
                  >
                    <FrontSide
                      style={{ background: "#fff", borderRadius: "5px" }}
                    >
                      <FrontSideContent content={card?.front_content} />
                    </FrontSide>
                    <BackSide
                      style={{ background: "#fff", borderRadius: "5px" }}
                    >
                      <BackSideContent content={card?.back_content} />
                    </BackSide>
                  </Flippy>
                </Box>
              </Slide>
            ))}
        </Box>
        {/* <Stack spacing={2}>
          <StyledToggleButtonGroup
            orientation="vertical"
            value={filter}
            exclusive
            onChange={(e, value) => setFilter(value)}
          >
            <StyledToggleButton value={FILTER.ALL}>
              <Tooltip title="All" placement="right">
                <FilterAltOffIcon color="primary" />
              </Tooltip>
            </StyledToggleButton>

            <StyledToggleButton value={FILTER.REMEMBERED}>
              <Tooltip title="Remembered Cards Only" placement="right">
                <CheckBoxIcon color="success" />
              </Tooltip>
            </StyledToggleButton>

            <StyledToggleButton value={FILTER.UNREMEMBERED}>
              <Tooltip title="Unremembered Cards Only" placement="right">
                <CheckBoxOutlineBlankIcon color="warning" />
              </Tooltip>
            </StyledToggleButton>
          </StyledToggleButtonGroup>
        </Stack> */}
      </Stack>
    </>
  );
}

const FrontSideContent = ({ content }: { content: string }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>{content}</h1>
    </Box>
  );
};

const BackSideContent = ({ content }: { content: string }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>{content}</h1>
    </Box>
  );
};

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  background: "#fff",
  "&:hover": {
    background: "#eee",
  },
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .Mui-selected": {
    backgroundColor: "#eee !important",
  },
  "& .Mui-selected:hover": {
    backgroundColor: "#eee !important",
  },
}));
