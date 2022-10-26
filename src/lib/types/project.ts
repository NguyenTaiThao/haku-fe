import { Network } from "./network";

export type Token = {
  id: number;
  name: string;
  symbol: string;
  decimal: number;
  network_id: number;
  address: string;
  is_native_token: boolean;
  icon: string;
  network: Network;
  earnings: number;
  reward: number;
  gross_sales: number;
  net_sales: number;
};

export type IDOBuyToken = {
  token_id: number;
  ido_rate: number;
  token: Token;
};

export type Project = {
  id: number;
  name: string;
  slug: string;
  logo_path: string;
  telegram_id: string;
  medium_id: string;
  twitter_id: string;
  discord_id: string;
  total_amount: number;
  total_sold: number;
  ido_start_date: string;
  ido_end_date: string;
  ido_sell_token_id: string;
  ido_buy_token_json: IDOBuyToken[];
  share_rate: number;
  ido_for_token_name: string;
  ido_for_token_symbol: string;
  is_publish: boolean;
  is_publish_in_home: boolean;
  project_owner_id: number;
  ido_url: string;
  performance_report?: PerformanceReportData;
  network_id: number;
  token_supply: number;
  project_validation: number;
  initial_token_circulation: number;
  initial_market_cap: number;
  sell_token: Token;
  buy_token: Token;
  system_share_rate: number;
  remaining_days: number;
  sales: number;
  tokens: IDOBuyToken[];
  network: Network;
};

export type PerformanceReportData = {
  affiliator_id: number;
  id: number;
  project_id: number;
  reward_token_id: number;
  total_amount_buy: number | null;
  total_amount_sell: number | null;
  total_reward_estimation: number | null;
  total_reward_given: number | null;
  share_rate: number | null;
};

export enum Locale {
  en,
  ja,
  ko,
}

type PC = {
  id?: number;
  project_id?: number;
  locale?: string;
  tab_name: string;
  html: string;
};

export type ProjectContent = {
  [key in keyof typeof Locale]: Array<PC>;
};

export type ProjectShortDes = {
  [key in keyof typeof Locale]: {
    id?: number;
    project_id?: number;
    locale: string;
    short_description: string;
  };
};

export type FAQ = {
  id?: number;
  affiliator_id?: number;
  project_id?: number;
  question: string;
  answer: string;
  is_publish: boolean;
  locale?: string;
};
