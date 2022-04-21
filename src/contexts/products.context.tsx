import {createContext, FC, useState, useEffect} from "react";
import {Product} from "../models/product";
import {getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";

interface ProductsContextInterface {
  products: Product[]
}

const defaultStates: ProductsContextInterface = {
  products: [],
}

export const ProductsContext = createContext<ProductsContextInterface>(defaultStates);

export const ProductsProvider: FC = ({children}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
    }
    getCategoriesMap();
  }, [])

  const value = {products}
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}


