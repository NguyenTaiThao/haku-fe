import { CardType } from "./card";

export type SetType = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  cards: CardType[];
  card_count: number;
  learned_percent: number;
};
