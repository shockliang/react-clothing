import {createContext, FC, useState, useEffect} from "react";
import {getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";
import {Product} from "../models/product";

interface CategoriesContextInterface {
  categoryMap: Map<string, Product[]>
}

const defaultStates: CategoriesContextInterface = {
  categoryMap: new Map<string, Product[]>(),
}

export const CategoriesContext = createContext<CategoriesContextInterface>(defaultStates);

export const CategoriesProvider: FC = ({children}) => {
  const [categoryMap, setCategoryMap] = useState(new Map<string, Product[]>());

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
      setCategoryMap(categoryMap);
    }
    getCategoriesMap();
  }, [])

  const value = {categoryMap}
  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}


