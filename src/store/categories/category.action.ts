import {Product} from "../../models/product";
import {createCategoriesAction} from "../../utils/reducer/reducer.utils";
import {CategoriesActionTypes} from "./category.types";

export const setCategoriesMap = (categoriesMap: Map<string, Product[]>) =>
  createCategoriesAction(CategoriesActionTypes.SET_CATEGORIES_MAP, categoriesMap);
