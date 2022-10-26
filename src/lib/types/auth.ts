import { AdminUser } from "./adminUser";

type UserLoginArgs = {
  email: string;
  password: string;
};

type UserLoginError = {
  message: string;
};

type UserToken = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

type UserLoginRes = {
  user: AdminUser;
  access_token: string
};

export type { UserLoginArgs, UserLoginRes, UserToken, UserLoginError };
