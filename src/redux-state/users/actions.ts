import { REGISTER, DELETE_ACCOUNT, Username, User } from "./types";

export function createUser(data: User) {
  return {
    type: REGISTER,
    payload: data
  };
}

export function deleteUser(username: Username) {
  return {
    type: DELETE_ACCOUNT,
    payload: {
      username
    }
  };
}