import {createSelector} from "reselect";
import {RootState} from "../root-reducer";
import {CartItemModel} from "../../models/cart-item";
import {CartState} from "./cart.reducer";

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart: CartState) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart: CartState) => cart.isCartOpen
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems: CartItemModel[]) => cartItems
    .reduce(((total, cartItem) => total + cartItem.quantity), 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems: CartItemModel[]) => cartItems
    .reduce(((total, cartItem) => total + cartItem.quantity * cartItem.price), 0)
);
