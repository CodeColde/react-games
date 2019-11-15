import { TOGGLE_MODE, DarkModeActionTypes } from "./types";

export const initialUserListState = false;

function darkMode (state = initialUserListState, action: DarkModeActionTypes) {
  switch (action.type) {
    case TOGGLE_MODE:
      return !state;
    default:
      return state;
  }
}

export default darkMode;