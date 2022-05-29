import {Action, ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";
import {CategoriesActionTypes, Category} from "./category.types";

export type FetchCategoriesStart = Action<CategoriesActionTypes.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS, Category[]>

export type FetchCategoriesFailed = ActionWithPayload<CategoriesActionTypes.FETCH_CATEGORIES_FAILED, Error>

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart =>
  createAction(CategoriesActionTypes.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((categories: Category[]): FetchCategoriesSuccess =>
  createAction(CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS, categories));

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed =>
  createAction(CategoriesActionTypes.FETCH_CATEGORIES_FAILED, error));
