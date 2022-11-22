import { Grid, Stack } from "@mui/material";
import { CardType, SetType } from "lib/types";
import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
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

  const { data: setData } = useQuery<SetType>(`sets/${1}`);

  useEffect(() => {
    if (setData) {
      setCards(setData.cards);
      setData.card_count > 0 && setCurrentCardIndex(0);
    }
  }, [setData, setCards]);

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else {
      setCurrentCardIndex(cards.length - 1);
    }
  };

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

  useEffect(() => {
    setCurrentCard(cards[currentCardIndex]);
    console.log(currentCardIndex);
  }, [currentCardIndex, setCurrentCard, cards]);

  return (
    <div>
      <h1>Learn</h1>
      <Grid container>
        <Grid item xs={12} md={2}>
          <ExtensionBar handleShuffle={handleShuffle} isRunning={isShuffling} />
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
