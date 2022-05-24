import {RootState} from "../root-reducer";
import {UserState} from "./user.reducer";
import {createSelector} from "reselect";

// export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  selectUserReducer,
  (user) => user.currentUser
);
