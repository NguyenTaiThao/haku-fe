type ContentLanguage = {
  html: string;
  id: number;
  locale: string;
  project_id: number;
  tab_name: string;
};

type ProjectContent = {
  en: ContentLanguage[];
  ja: ContentLanguage[];
  ko: ContentLanguage[];
};

type ProjectOwner = {
  description: string;
  id: number;
  name: string;
  pic_discord_id: string;
  pic_email: string;
  pic_fb_id: string;
  pic_telegram_id: string;
  pic_twitter_id: string;
};

type Shortlanguage = {
  id: number;
  locale: string;
  project_id: number;
  short_description: string;
};

type ShortDescription = {
  en: Shortlanguage;
  ja: Shortlanguage;
  ko: Shortlanguage;
};

type ResponseProject = {
  code: string;
  discord_id: string;
  id: number;
  ido_buy_token_id: string;
  ido_end_date: Date;
  ido_for_token_name: string;
  ido_for_token_symbol: string;
  ido_network: string;
  ido_rate: string;
  ido_start_date: Date;
  is_publish: number;
  logo_path: string;
  medium_id: string;
  name: string;
  project_contents: ProjectContent;
  project_owner: ProjectOwner;
  project_owner_id: number;
  project_short_descriptions: ShortDescription;
  symbol: string;
  telegram_id: string;
  total_amount: number;
  total_sold: number;
  twitter_id: string;
};

export type {
  ResponseProject,
  ProjectContent,
  ProjectOwner,
  ShortDescription,
  ContentLanguage,
};
