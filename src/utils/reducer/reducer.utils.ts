import {CartActionTypes} from "../../contexts/cart.context";

export const createCartAction = (type: CartActionTypes, payload: any) => {
  return {type, payload}
};
