import {User, UserInfo} from "firebase/auth";
import {ActionWithPayload, createUserAction} from "../../utils/reducer/reducer.utils";
import {UserActionTypes} from "./user.types";
import {AdditionalInformation, UserData} from "../../utils/firebase/firebase.utils";

export type EmailSignInStart = ActionWithPayload<UserActionTypes.EMAIL_SIGN_IN_START,
  { email: string; password: string }>;

export type SignUpSuccess = ActionWithPayload<
  UserActionTypes.SIGN_UP_SUCCESS,
  { user: User; additionalDetails: AdditionalInformation }
  >;

export type SignUpStart = ActionWithPayload<
  UserActionTypes.SIGN_UP_START,
  { email: string; password: string; displayName: string }
  >;

export const setCurrentUser = (user: UserInfo | undefined) =>
  createUserAction(UserActionTypes.SET_CURRENT_USER, user);

export const checkUserSession = () =>
  createUserAction(UserActionTypes.CHECK_USER_SESSION, undefined);

export const googleSignInStart = () =>
  createUserAction(UserActionTypes.GOOGLE_SIGN_IN_START, undefined);

export const emailSignInStart = (email: string, password: string) =>
  createUserAction(UserActionTypes.EMAIL_SIGN_IN_START, {email, password});

export const signInSuccess = (user: UserData & { id: string }) =>
  createUserAction(UserActionTypes.SIGN_IN_SUCCESS, user);

export const signInFailed = (error: Error) =>
  createUserAction(UserActionTypes.SIGN_IN_FAILED, error);

export const signUpStart = (email: string, password: string, displayName: string) =>
  createUserAction(UserActionTypes.SIGN_UP_START, {email, password, displayName});

export const signUpSuccess = (user: User, additionalDetails: AdditionalInformation) =>
  createUserAction(UserActionTypes.SIGN_UP_SUCCESS, {user, additionalDetails});

export const signUpFailed = (error: Error) =>
  createUserAction(UserActionTypes.SIGN_UP_FAILED, error);

