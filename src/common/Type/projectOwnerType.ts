import { UserLoginArgs } from "lib/types";

export type ProjectOwnerData = {
  id: number;
  name: string;
  description: string;
  pic_telegram_id: string;
  pic_twitter_id: string;
  pic_fb_id: string;
  pic_discord_id: string;
  pic_email: string;
  email: string;
  password: string;
  user: UserLoginArgs;
};
