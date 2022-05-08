import {CartActionTypes} from "../../contexts/cart.context";

export const createAction = (type: CartActionTypes, payload: any) => {
  return {type, payload}
};
