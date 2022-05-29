import {CategoriesActionTypes, Category} from "./category.types";
import {ShopData} from "../../models/shop-data";
import {CategoryAction} from "./category.action";

export type CategoriesState = {
  readonly categories: Category[],
  readonly isLoading: boolean,
  readonly error: Error | null
}

interface CategoriesAction {
  type: CategoriesActionTypes,
  payload: ShopData[]
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE,
                                  action = {} as CategoryAction) => {
  switch (action.type) {
    case CategoriesActionTypes.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true
      }
    case CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        isLoading: false
      }
    case CategoriesActionTypes.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    default:
      return state;
  }
}
