import { request } from "lib/request";
import { AdminUser, UserLoginArgs, UserLoginRes } from "lib/types";

const loginApi = (args: UserLoginArgs) =>
  request.post<UserLoginRes>("/login", args);

const logoutApi = () => request.post("/logout");

const userApi = () => request.get<AdminUser>("me");

export { loginApi, logoutApi, userApi };
