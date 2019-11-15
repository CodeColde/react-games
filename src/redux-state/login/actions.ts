import { LOGIN, LOGOUT } from "./types";
import { User } from "redux-state/users/types";

export function loginAction (user: User) {
    return {
        type: LOGIN,
        payload: {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        }
    };
}
export function logout() {
    return {
        type: LOGOUT
    };
}