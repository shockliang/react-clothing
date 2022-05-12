import {createCategoriesAction} from "../../utils/reducer/reducer.utils";
import {CategoriesActionTypes} from "./category.types";
import {ShopData} from "../../models/shop-data";

export const setCategories = (categories: ShopData[]) =>
  createCategoriesAction(CategoriesActionTypes.SET_CATEGORIES, categories);
