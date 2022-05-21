import {createCategoriesAction} from "../../utils/reducer/reducer.utils";
import {CategoriesActionTypes} from "./category.types";
import {ShopData} from "../../models/shop-data";

export const fetchCategoriesStart = () =>
  createCategoriesAction(CategoriesActionTypes.FETCH_CATEGORIES_START, null);

export const fetchCategoriesSuccess = (categories: ShopData[]) =>
  createCategoriesAction(CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = (error: any) =>
  createCategoriesAction(CategoriesActionTypes.FETCH_CATEGORIES_FAILED, error);
