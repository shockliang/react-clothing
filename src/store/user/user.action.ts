import {User} from "firebase/auth";
import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher
} from "../../utils/reducer/reducer.utils";
import {UserActionTypes} from "./user.types";
import {AdditionalInformation, UserData} from "../../utils/firebase/firebase.utils";

export type SetCurrentUser = ActionWithPayload<UserActionTypes.SET_CURRENT_USER, UserData>
export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser =>
  createAction(UserActionTypes.SET_CURRENT_USER, user));

export type CheckUserSession = Action<UserActionTypes.CHECK_USER_SESSION>;
export const checkUserSession = withMatcher((): CheckUserSession =>
  createAction(UserActionTypes.CHECK_USER_SESSION));

export type GoogleSignInStart = Action<UserActionTypes.GOOGLE_SIGN_IN_START>;
export const googleSignInStart = withMatcher((): GoogleSignInStart =>
  createAction(UserActionTypes.GOOGLE_SIGN_IN_START));

export type EmailSignInStart = ActionWithPayload<UserActionTypes.EMAIL_SIGN_IN_START,
  { email: string; password: string }>;
export const emailSignInStart = withMatcher((email: string, password: string): EmailSignInStart =>
  createAction(UserActionTypes.EMAIL_SIGN_IN_START, {email, password}));

export type SignInSuccess = ActionWithPayload<UserActionTypes.SIGN_IN_SUCCESS, UserData>;
export const signInSuccess = withMatcher((user: UserData & { id: string }): SignInSuccess =>
  createAction(UserActionTypes.SIGN_IN_SUCCESS, user));

export type SignInFailed = ActionWithPayload<UserActionTypes.SIGN_IN_FAILED, Error>;
export const signInFailed = withMatcher((error: Error): SignInFailed =>
  createAction(UserActionTypes.SIGN_IN_FAILED, error));

export type SignUpStart = ActionWithPayload<UserActionTypes.SIGN_UP_START,
  { email: string; password: string; displayName: string }>;
export const signUpStart = withMatcher((email: string, password: string, displayName: string): SignUpStart =>
  createAction(UserActionTypes.SIGN_UP_START, {email, password, displayName}));

export type SignUpSuccess = ActionWithPayload<UserActionTypes.SIGN_UP_SUCCESS,
  { user: User; additionalDetails: AdditionalInformation }>;
export const signUpSuccess = withMatcher((user: User, additionalDetails: AdditionalInformation): SignUpSuccess =>
  createAction(UserActionTypes.SIGN_UP_SUCCESS, {user, additionalDetails}));

export type SignUpFailed = ActionWithPayload<UserActionTypes.SIGN_UP_FAILED, Error>;
export const signUpFailed = withMatcher((error: Error): SignUpFailed =>
  createAction(UserActionTypes.SIGN_UP_FAILED, error));

export type SignOutStart = Action<UserActionTypes.SIGN_OUT_START>;
export const signOutStart = withMatcher((): SignOutStart =>
  createAction(UserActionTypes.SIGN_OUT_START));

export type SignOutSuccess = Action<UserActionTypes.SIGN_OUT_SUCCESS>;
export const signOutSuccess = withMatcher((): SignOutSuccess =>
  createAction(UserActionTypes.SIGN_OUT_SUCCESS));

export type SignOutFailed = ActionWithPayload<UserActionTypes.SIGN_OUT_FAILED, Error>;
export const signOutFailed = withMatcher((error: Error): SignOutFailed =>
  createAction(UserActionTypes.SIGN_OUT_FAILED, error));

