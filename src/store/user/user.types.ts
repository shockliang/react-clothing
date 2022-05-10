import {UserInfo} from "firebase/auth";

export enum UserActionTypes {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
}

export interface UserAction {
  type: UserActionTypes,
  payload: UserInfo | null | undefined
}

export interface UserState {
  currentUser: UserInfo | null | undefined
}
