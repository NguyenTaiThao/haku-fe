import { Grid, Stack } from "@mui/material";
import { useModalState } from "lib/hooks";
import { request } from "lib/request";
import { CardType, SetType } from "lib/types";
import { shuffle } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Card from "./Card";
import CardNumber from "./CardNumber";
import ExtensionBar from "./ExtensionBar";
import Navigators from "./Navigators";
import QuizGameModal from "./QuizGameModal";

export const FILTER = {
  ALL: 1,
  REMEMBERED: 2,
  UNREMEMBERED: 3,
} as const;

export default function Learn() {
  const [cards, setCards] = useState<SetType["cards"]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [currentCard, setCurrentCard] = useState<CardType | undefined>();
  const [handleFlip, setHandleFlip] = useState<() => void>(() => () => {});
  const [progress, setProgress] = useState(0);
  const [filter, setFilter] = useState<number>(FILTER.ALL);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const { isOpen, onOpen, onClose, onToggle } = useModalState(true);

  const params = useParams();
  const { id } = params as { id: number };

  const { data: setData, refetch } = useQuery<SetType>(`sets/${id}`, {
    refetchOnMount: true,
  });

  useEffect(() => {
    if (cards.length > 0) {
      const rememberedNum = cards.filter((card) => card.is_remembered).length;
      setProgress((rememberedNum / cards.length) * 100);
    }
  }, [cards]);

  useEffect(() => {
    if (setData) {
      setCards(setData.cards);
      setData.card_count > 0 && setCurrentCardIndex(0);
    }
  }, [setData, setCards]);

  const handleNext = useCallback(() => {
    setCurrentCardIndex((value) => {
      let index;
      if (value < cards.length - 1) index = value + 1;
      else index = 0;
      console.log(value, index, cards.length);
      return index;
    });
  }, [cards]);

  const handlePrevious = useCallback(() => {
    setCurrentCardIndex((value) => {
      if (value > 0) return value - 1;
      else return cards.length - 1;
    });
  }, [cards]);

  useEffect(() => {
    let filtered = [] as SetType["cards"] | undefined;
    refetch();
    switch (filter) {
      case FILTER.ALL:
        filtered = setData?.cards;
        break;
      case FILTER.REMEMBERED:
        filtered = setData?.cards.filter((card) => !!card?.is_remembered);
        break;
      case FILTER.UNREMEMBERED:
        filtered = setData?.cards.filter((card) => !card?.is_remembered);
        break;
    }
    setCards(filtered || []);
    setCurrentCardIndex(0);
  }, [filter, setData]);

  const toggleRemember = useCallback(
    async (id: number) => {
      try {
        const res = await request.post(`card/toggle-remember/${id}`);
        const newCards = cards.map((card) =>
          card.id === id
            ? { ...card, is_remembered: !card.is_remembered }
            : card
        );

        setCards(newCards);

        handleNext();
      } catch (e) {
        console.log(e);
      }
    },
    [handleNext]
  );

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
            progress={progress}
            isAutoPlaying={isAutoPlaying}
            setIsAutoPlaying={setIsAutoPlaying}
            handleQuiz={onOpen}
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
              setFilter={setFilter}
              filter={filter}
            />
            <Navigators
              handleFlip={handleFlip}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              toggleRemember={toggleRemember}
              currentCard={currentCard}
              isAutoPlaying={isAutoPlaying}
            />
          </Stack>
        </Grid>
      </Grid>
      <QuizGameModal
        isOpen={isOpen}
        onClose={onClose}
        cardNumber={setData?.card_count}
      />
    </div>
  );
}
