import {CartItemModel} from "../../models/cart-item";
import {CartActionTypes} from "./cart.types";

export interface CartState {
  isCartOpen: boolean,
  cartItems: CartItemModel[],
}

interface CartAction {
  type: CartActionTypes,
  payload: CartItemModel[] | boolean
}

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
}

export const cartReducer = (state: CartState = CART_INITIAL_STATE, action: CartAction) => {
  const {type, payload} = action;

  switch (type) {
    case CartActionTypes.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload
      };
    case CartActionTypes.SET_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      };
    default:
      return state;
  }
}
