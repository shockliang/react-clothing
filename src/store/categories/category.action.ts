import {Action, ActionWithPayload, createAction} from "../../utils/reducer/reducer.utils";
import {CategoriesActionTypes, Category} from "./category.types";

export type FetchCategoriesStart = Action<CategoriesActionTypes.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS, Category[]>

export type FetchCategoriesFailed = ActionWithPayload<CategoriesActionTypes.FETCH_CATEGORIES_FAILED, Error>

export type CategoryAction =
  FetchCategoriesStart |
  FetchCategoriesSuccess |
  FetchCategoriesFailed;

export const fetchCategoriesStart = (): FetchCategoriesStart =>
  createAction(CategoriesActionTypes.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categories: Category[]): FetchCategoriesSuccess =>
  createAction(CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = (error: Error): FetchCategoriesFailed =>
  createAction(CategoriesActionTypes.FETCH_CATEGORIES_FAILED, error);
