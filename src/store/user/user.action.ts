import {UserInfo} from "firebase/auth";
import {createUserAction} from "../../utils/reducer/reducer.utils";
import {UserActionTypes} from "./user.types";

export const setCurrentUser = (user: UserInfo | undefined) =>
  createUserAction(UserActionTypes.SET_CURRENT_USER, user);
