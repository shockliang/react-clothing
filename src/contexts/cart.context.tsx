import {createContext, FC, useEffect, useState} from "react";
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

  if(existCartItem && existCartItem.quantity === 1) {
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
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemModel[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(((total, cartItem) => total + cartItem.quantity), 0);
    setCartCount(newCartCount);
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = cartItems.reduce(((total, cartItem) => total + cartItem.quantity * cartItem.price), 0);
    setCartTotal(newCartTotal);
  }, [cartItems])

  const addItemToCart = (productToAdd: Product) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (cartItemToRemoved: CartItemModel) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemoved));
  }

  const clearItemFromCart = (cartItemToClear: CartItemModel) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  }

  return (<CartContext.Provider
    value={{
      isCartOpen,
      setIsCartOpen,
      cartItems,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      cartCount,
      cartTotal}}
  >
    {children}
  </CartContext.Provider>);
}
