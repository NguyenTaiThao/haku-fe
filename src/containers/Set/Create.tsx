import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Fab, Grid, Stack } from "@mui/material";
import { Input } from "components/Form";
import { CardType, SetType } from "lib/types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CardCreator from "./components/CardCreator";
import { useApiResource } from "lib/hooks";
import { LoadingButton } from "@mui/lab";
import { Redirect, useHistory } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
});

export type CardCreateType = Pick<CardType, "front_content" | "back_content">;
export type SetCreateType = Pick<SetType, "name" | "description"> & {
  cards: CardCreateType[];
};

export default function Create() {
  const [cards, setCards] = useState<CardCreateType[]>([
    { front_content: "", back_content: "" },
  ]);

  const history = useHistory();

  const { createApi } = useApiResource<SetType>("sets");

  const {
    control,
    formState: { isSubmitting },
    setValue,
    handleSubmit,
    reset,
  } = useForm<SetCreateType>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const savingCards = cards.filter(
      (card) => card.front_content !== "" || card.back_content !== ""
    );
    setValue("cards", savingCards);
  }, [cards, setValue]);

  const addCard = (front_content: string, back_content: string) => {
    setCards((cards) => [...cards, { front_content, back_content }]);
  };

  const editCard = (
    index: number,
    front_content: string,
    back_content: string
  ) => {
    const newCards = [...cards];
    newCards[index] = { front_content, back_content };
    setCards(newCards);
  };

  const removeCard = (index: number) => {
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);
  };

  const onSubmit = async (data: SetCreateType) => {
    await createApi(data as SetType);
    reset();
    setCards([{ front_content: "", back_content: "" }]);
    history.push("/sets");
  };

  return (
    <div>
      <h1>Create New Set</h1>

      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <Grid container mb={3}>
          <Grid item xs={5}>
            <Input
              label="Name"
              name="name"
              placeholder="Enter name of new set"
              control={control}
              fullWidth
            ></Input>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={5}>
            <Input
              label="Description"
              name="description"
              placeholder="Enter description of new set"
              control={control}
              fullWidth
            ></Input>
          </Grid>
        </Grid>

        <Grid container mt={3} rowSpacing={2}>
          {cards.map((item, index) => (
            <Grid key={index} item xs={12}>
              <CardCreator
                index={index}
                front={item.front_content}
                back={item.back_content}
                addCard={addCard}
                editCard={editCard}
                removeCard={removeCard}
              />
            </Grid>
          ))}
          <Grid item xs={12} mb={4}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              sx={{ borderRadius: 2 }}
              onClick={() => addCard("", "")}
            >
              <AddOutlinedIcon />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <LoadingButton
                type="submit"
                color="success"
                variant="contained"
                size="large"
                loading={isSubmitting}
              >
                Create
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
