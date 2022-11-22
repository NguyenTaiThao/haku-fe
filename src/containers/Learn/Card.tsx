// @ts-nocheck
import { Box, Slide } from "@mui/material";
import { CardType } from "lib/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";

type PropTypes = {
  setHandleFlip: Dispatch<SetStateAction<() => void>>;
  card: CardType | undefined;
  cards: CardType[] | undefined;
};

export default function Card({ setHandleFlip, card, cards }: PropTypes) {
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
      <Box sx={{ position: "relative", width: "800px", height: "500px" }}>
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
                  <FrontSide style={{ background: "#fff" }}>
                    <FrontSideContent content={card?.front_content} />
                  </FrontSide>
                  <BackSide style={{ background: "#fff" }}>
                    <BackSideContent content={card?.back_content} />
                  </BackSide>
                </Flippy>
              </Box>
            </Slide>
          ))}
      </Box>
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

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
