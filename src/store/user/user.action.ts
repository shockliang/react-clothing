import {User, UserInfo} from "firebase/auth";
import {ActionWithPayload, createUserAction} from "../../utils/reducer/reducer.utils";
import {UserActionTypes} from "./user.types";
import {UserData} from "../../utils/firebase/firebase.utils";

export type EmailSignInStart = ActionWithPayload<
  UserActionTypes.EMAIL_SIGN_IN_START,
  { email: string; password: string }
  >;

export const setCurrentUser = (user: UserInfo | undefined) =>
  createUserAction(UserActionTypes.SET_CURRENT_USER, user);

export const checkUserSession = () =>
  createUserAction(UserActionTypes.CHECK_USER_SESSION, undefined);

export const googleSignInStart = () =>
  createUserAction(UserActionTypes.GOOGLE_SIGN_IN_START, undefined);

export const emailSignInStart = (email: string, password: string) =>
  createUserAction(UserActionTypes.EMAIL_SIGN_IN_START, {email, password});

export const signInSuccess = (user: UserData & {id: string}) =>
  createUserAction(UserActionTypes.SIGN_IN_SUCCESS, user);

export const signInFailed = (error: Error) =>
  createUserAction(UserActionTypes.SIGN_IN_FAILED, error);

