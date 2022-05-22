import {UserInfo} from "firebase/auth";

export enum UserActionTypes {
  SET_CURRENT_USER = 'user/SET_CURRENT_USER',
  CHECK_USER_SESSION = 'user/CHECK_USER_SESSION',
  GOOGLE_SIGN_IN_START = 'user/GOOGLE_SIGN_IN_START',
  EMAIL_SIGN_IN_START = 'user/EMAIL_SIGN_IN_START',
  SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS',
  SIGN_IN_FAILED = 'user/SIGN_IN_FAILED',
}

export interface UserAction {
  type: UserActionTypes,
  payload: UserInfo | null | undefined
}

export interface UserState {
  currentUser: UserInfo | null | undefined
}
