import { CountryData } from "./CommonType";

export type AffiliatorData = {
  id: number;
  google_id: string;
  facebook_id: string;
  telegram_id: string;
  twitter_id: string;
  discord_id: string;
  name: string;
  country_id: string;
  country: CountryData;
  avatar_url: string;
  wallet_address: string;
  referer_by: string;
  referer_code: string;
  email: string;
};
