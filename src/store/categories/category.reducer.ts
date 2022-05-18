import {CategoriesActionTypes} from "./category.types";
import {ShopData} from "../../models/shop-data";

interface CategoriesState {
  categories: ShopData[],
  isLoading: boolean,
  error: any
}

interface CategoriesAction {
  type: CategoriesActionTypes,
  payload: ShopData[]
}

export const CATEGORIES_INITIAL_STATE : CategoriesState = {
  categories: [],
  isLoading: false,
  error: null
}

export const categoriesReducer = (state: CategoriesState = CATEGORIES_INITIAL_STATE, action: CategoriesAction) => {
  const {type, payload} = action;
  switch (type) {
    case CategoriesActionTypes.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true
      }
    case CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload,
        isLoading: false
      }
    case CategoriesActionTypes.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        error: payload,
        isLoading: false
      }
    default:
        return state;
  }
}
