import {UserInfo} from "firebase/auth";
import {UserActionTypes} from "./user.types";

interface UserAction {
  type: UserActionTypes,
  payload: UserInfo | null | undefined
}

interface UserState {
  currentUser: UserInfo | null | undefined
}

export const userReducer = (state: UserState = INITIAL_STATE, action: UserAction) => {
  const {type, payload} = action;
  switch (type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      return state;
  }
}

const INITIAL_STATE: UserState = {
  currentUser: null,
}