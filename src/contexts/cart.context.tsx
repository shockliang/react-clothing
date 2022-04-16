import {createContext, FC, useEffect, useState} from "react";
import {CartItemModel} from "../models/cart-item";
import {Product} from "../models/product";

interface CartContextInterface {
  isCartOpen: boolean,
  setIsCartOpen: (isCartOpen: boolean) => void,
  cartItems: CartItemModel[],
  addItemToCart: (product: Product) => void,
  cartCount: number
}

const defaultStates: CartContextInterface = {
  isCartOpen: false,
  setIsCartOpen: (isCartOpen) => null,
  cartItems: [],
  addItemToCart: (product) => null,
  cartCount: 0
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

export const CartContext = createContext<CartContextInterface>(defaultStates);

export const CartProvider: FC = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemModel[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(((total, cartItem) => total + cartItem.quantity), 0);
    setCartCount(newCartCount);
  }, [cartItems])

  const addItemToCart = (productToAdd: Product) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  return (<CartContext.Provider
    value={{isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount}}>{children}</CartContext.Provider>);
}
