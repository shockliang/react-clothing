import {combineReducers} from "redux";
import {userReducer} from "./user/user.reducer";

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  user: userReducer,
});
