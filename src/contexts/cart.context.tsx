import {createContext, FC, useState} from "react";

interface CartContextInterface {
  isCartOpen: boolean,
  setIsCartOpen: (isCartOpen: boolean) => void
}

const defaultValues: CartContextInterface = {
  isCartOpen: false,
  setIsCartOpen: (isCartOpen) => null
}

export const CartContext = createContext<CartContextInterface>(defaultValues);

export const CartProvider: FC = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  return (<CartContext.Provider value={{isCartOpen, setIsCartOpen}}>{children}</CartContext.Provider>);
}
