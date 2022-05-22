import {UserInfo} from "firebase/auth";
import {UserActionTypes} from "./user.types";
import {UserData} from "../../utils/firebase/firebase.utils";

interface UserAction {
  type: UserActionTypes,
  payload: UserInfo | null | undefined
}

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};


export const userReducer = (state: UserState = INITIAL_STATE, action: UserAction) => {
  const {type, payload} = action;
  switch (type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload
      }
    case UserActionTypes.SIGN_IN_FAILED:
      return {
        ...state,
        error: payload
      }
    default:
      return state;
  }
}

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null
}
