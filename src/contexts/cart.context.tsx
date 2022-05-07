import {createContext, FC, useReducer} from "react";
import {CartItemModel} from "../models/cart-item";
import {Product} from "../models/product";

interface CartContextInterface {
  isCartOpen: boolean,
  setIsCartOpen: (isCartOpen: boolean) => void,
  cartItems: CartItemModel[],
  addItemToCart: (product: Product) => void,
  removeItemFromCart: (cartItem: CartItemModel) => void,
  clearItemFromCart: (cartItem: CartItemModel) => void,
  cartCount: number,
  cartTotal: number
}

const defaultStates: CartContextInterface = {
  isCartOpen: false,
  setIsCartOpen: (isCartOpen) => null,
  cartItems: [],
  addItemToCart: (product) => null,
  removeItemFromCart: (cartItem) => null,
  clearItemFromCart: (cartItem) => null,
  cartCount: 0,
  cartTotal: 0
}

interface CartState {
  isCartOpen: boolean,
  cartItems: CartItemModel[],
  cartCount: number,
  cartTotal: number
}

const INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
};

enum CartActionTypes {
  SET_CART_ITEMS = 'SET_CART_ITEMS',
  SET_CART_OPEN = 'SET_CART_OPEN'
}

interface CartAction {
  type: CartActionTypes,
  payload: CartActionPayload
}

interface CartActionPayload {
  cartItems: CartItemModel[],
  cartCount: number,
  cartTotal: number
}

const cartReducer = (state: CartState, action: CartAction) => {
  const {type, payload} = action;

  switch (type) {
    case CartActionTypes.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
}

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

export const CartContext = createContext<CartContextInterface>(defaultStates);

export const CartProvider: FC = ({children}) => {
  const [{cartItems, cartCount, cartTotal, isCartOpen}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems: CartItemModel[]) => {
    const newCartCount = newCartItems
      .reduce(((total, cartItem) => total + cartItem.quantity), 0);
    const newCartTotal = newCartItems
      .reduce(((total, cartItem) => total + cartItem.quantity * cartItem.price), 0);

    dispatch({
      type: CartActionTypes.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal
      }
    });
  }

  const addItemToCart = (productToAdd: Product) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }

  const removeItemFromCart = (cartItemToRemoved: CartItemModel) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemoved);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (cartItemToClear: CartItemModel) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  }

  return (<CartContext.Provider
    value={{
      isCartOpen,
      setIsCartOpen: () => {},
      cartItems,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      cartCount,
      cartTotal
    }}
  >
    {children}
  </CartContext.Provider>);
}
