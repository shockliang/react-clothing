import {ActionWithPayload, createAction, createCartAction, withMatcher} from "../../utils/reducer/reducer.utils";
import {CartActionTypes, CartItem} from "./cart.types";
import {CategoryItem} from "../categories/category.types";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
  const existCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  if (existCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id
      ? {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem)
  }

  // whole new item
  return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
  const existCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

  if (existCartItem && existCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id
    ? {...cartItem, quantity: cartItem.quantity - 1}
    : cartItem)
}

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

export type SetIsCartOpen = ActionWithPayload<CartActionTypes.SET_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CartActionTypes.SET_CART_ITEMS, CartItem[]>;

export const setIsCartOpen = withMatcher((isCartOpen: boolean): SetIsCartOpen =>
  createAction(CartActionTypes.SET_CART_OPEN, isCartOpen));

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems =>
  createAction(CartActionTypes.SET_CART_ITEMS, cartItems));

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
}

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemoved: CartItem) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemoved);
  return setCartItems(newCartItems);
}

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return setCartItems(newCartItems);
}
