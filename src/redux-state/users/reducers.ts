import { REGISTER, DELETE_ACCOUNT, RegisterActionTypes, User } from "./types";

export const initialUserListState = [];

function users(state = initialUserListState, action: RegisterActionTypes) {
  switch (action.type) {
    case REGISTER:
      return [
        ...state,
        {
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            username: action.payload.username,
            password: action.payload.password
        }
      ];
    case DELETE_ACCOUNT:
      const newState = state.filter(
        (item: User) => item.username !== action.payload.username
      );
      return newState;
    default:
      return state;
  }
}

export default users;