import { loginUser } from "./handlers/loginUser";
import { logoutUser } from "./handlers/logoutUser";

export const loginHandler = {
  loginUser: loginUser,
  logoutUser: logoutUser,
};
