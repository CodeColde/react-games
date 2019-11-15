import {
    LOGIN,
    LOGOUT,
    LoginActionTypes
} from "./types";

export const initialLoginState = {};

function loginReducer(state = initialLoginState, action: LoginActionTypes) {
    switch (action.type) {
        case LOGIN:
            return {
                ...action.payload
            };
        case LOGOUT:
            return initialLoginState;
        default:
            return state;
    }
}

export default loginReducer;