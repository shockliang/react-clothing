import {createCartAction} from "../../utils/reducer/reducer.utils";
import {Product} from "../../models/product";
import {CartItemModel} from "../../models/cart-item";
import {CartActionTypes} from "./cart.types";

const addCartItem = (cartItems: CartItemModel[], productToAdd: Product): CartItemModel[] => {
  const existCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  if (existCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id
      ? {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem)
  }

  // whole new item
  return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems: CartItemModel[], cartItemToRemove: CartItemModel): CartItemModel[] => {
  const existCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

  if (existCartItem && existCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id
    ? {...cartItem, quantity: cartItem.quantity - 1}
    : cartItem)
}

const clearCartItem = (cartItems: CartItemModel[], cartItemToClear: CartItemModel): CartItemModel[] => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

export const setIsCartOpen = (isCartOpen: boolean) => createCartAction(CartActionTypes.SET_CART_OPEN, isCartOpen);

export const addItemToCart = (cartItems: CartItemModel[], productToAdd: Product) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createCartAction(CartActionTypes.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems: CartItemModel[], cartItemToRemoved: CartItemModel) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemoved);
  return createCartAction(CartActionTypes.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems: CartItemModel[], cartItemToClear: CartItemModel) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createCartAction(CartActionTypes.SET_CART_ITEMS, newCartItems);
}
