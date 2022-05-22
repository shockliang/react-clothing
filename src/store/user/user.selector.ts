import {RootState} from "../root-reducer";
import {UserState} from "./user.reducer";

export const selectUserReducer = (state: RootState): UserState => state.user;

