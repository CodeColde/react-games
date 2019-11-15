import { Username, FirstName, LastName, User } from "redux-state/users/types";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export interface UserLogin {
    username: Username;
    firstName: FirstName;
    lastName: LastName;
}

export interface LoginActionReturn {
    type: typeof LOGIN;
    payload: UserLogin;
}

export interface LogoutActionReturn {
    type: typeof LOGOUT;
}

export type LoginAction = (user: User) => LoginActionReturn;
export type LogoutAction = () => LogoutActionReturn;

export type LoginActionTypes =
  | LoginActionReturn
  | LogoutActionReturn