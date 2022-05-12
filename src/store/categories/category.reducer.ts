import {CategoriesActionTypes} from "./category.types";
import {ShopData} from "../../models/shop-data";

interface CategoriesState {
  categories: ShopData[]
}

interface CategoriesAction {
  type: CategoriesActionTypes,
  payload: ShopData[]
}

export const CATEGORIES_INITIAL_STATE : CategoriesState = {
  categories: []
}

export const categoriesReducer = (state: CategoriesState = CATEGORIES_INITIAL_STATE, action: CategoriesAction) => {
  const {type, payload} = action;
  switch (type) {
    case CategoriesActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: payload
      }
    default:
        return state;
  }
}
