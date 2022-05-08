import {CartActionTypes} from "../../contexts/cart.context";
import {UserActionTypes} from "../../contexts/user.context";

export const createCartAction = (type: CartActionTypes, payload: any) => {
  return {type, payload}
};

export const createUserAction = (type: UserActionTypes, payload: any) => {
  return {type, payload}
};
