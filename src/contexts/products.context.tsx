import {createContext, FC, useState} from "react";
import PRODUCTS from '../shop-data.json';
import {Product} from "../models/product";

interface ProductsContextInterface {
  products: Product[]
}

const defaultStates: ProductsContextInterface = {
  products: [],
}

export const ProductsContext = createContext<ProductsContextInterface>(defaultStates);

export const ProductsProvider: FC = ({children}) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = {products}
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}


