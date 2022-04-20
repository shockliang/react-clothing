import {createContext, FC, useState, useEffect} from "react";
import {Product} from "../models/product";

interface ProductsContextInterface {
  products: Product[]
}

const defaultStates: ProductsContextInterface = {
  products: [],
}

export const ProductsContext = createContext<ProductsContextInterface>(defaultStates);

export const ProductsProvider: FC = ({children}) => {
  const [products, setProducts] = useState([]);

  const value = {products}
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}


