import { Grid, Stack } from "@mui/material";
import { CardType, SetType } from "lib/types";
import { shuffle } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Card from "./Card";
import CardNumber from "./CardNumber";
import ExtensionBar from "./ExtensionBar";
import Navigators from "./Navigators";

export default function Learn() {
  const [cards, setCards] = useState<SetType["cards"]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [currentCard, setCurrentCard] = useState<CardType | undefined>();
  const [handleFlip, setHandleFlip] = useState<() => void>(() => () => {});

  const params = useParams();
  const {id} = params as {id: number};

  const { data: setData } = useQuery<SetType>(`sets/${id}`);

  useEffect(() => {
    if (setData) {
      setCards(setData.cards);
      setData.card_count > 0 && setCurrentCardIndex(0);
    }
  }, [setData, setCards]);

  const handleNext = useCallback(() => {
    setCurrentCardIndex((value) => {
      let index
      if (value < cards.length - 1) index = value + 1;
      else index = 0;
      console.log(value, index, cards.length  );
      return index
    });
  }, [cards]);
  
  const handlePrevious = useCallback(() => {
    setCurrentCardIndex((value) => {
      if (value > 0) return value - 1;
      else return cards.length - 1;
    });
  }, [cards]);

  const handleShuffle = () => {
    setIsShuffling(true);
    const shuffledCards = shuffle(cards);
    setCards(shuffledCards);
    handleNext();
    setTimeout(() => {
      handlePrevious();
      setIsShuffling(false);
    }, 500);
  };

  const handleAutoPlay = () => {
    handleNext();
    setTimeout(() => {
      handleFlip();
    }, 2500);

    const timer = setInterval(() => {
      handleNext();
      setTimeout(() => {
        handleFlip();
      }, 1000);
    }, 5000);
    return () => clearInterval(timer);
  };

  useEffect(() => {
    setCurrentCard(cards[currentCardIndex]);
    console.log(currentCardIndex);
  }, [currentCardIndex, setCurrentCard, cards]);

  return (
    <div>
      <h1>Learn</h1>
      <Grid container>
        <Grid item xs={12} md={2}>
          <ExtensionBar
            handleShuffle={handleShuffle}
            isRunning={isShuffling}
            handleAutoPlay={handleAutoPlay}
            setInfo={setData}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={10}
          sx={{ overflow: "hidden", background: "#999" }}
        >
          <Stack alignItems="center" spacing={2} py={2}>
            <CardNumber position={currentCardIndex + 1} total={cards.length} />
            <Card
              setHandleFlip={setHandleFlip}
              card={currentCard}
              cards={cards}
            />
            <Navigators
              handleFlip={handleFlip}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}
