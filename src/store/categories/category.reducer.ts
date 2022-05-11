import {Product} from "../../models/product";
import {CategoriesActionTypes} from "./category.types";

interface CategoriesState {
  categoriesMap: Map<string, Product[]>
}

interface CategoriesAction {
  type: CategoriesActionTypes,
  payload: Map<string, Product[]>
}

export const CATEGORIES_INITIAL_STATE : CategoriesState = {
  categoriesMap: new Map<string, Product[]>()
}

export const categoriesReducer = (state: CategoriesState = CATEGORIES_INITIAL_STATE, action: CategoriesAction) => {
  const {type, payload} = action;
  switch (type) {
    case CategoriesActionTypes.SET_CATEGORIES_MAP:
      return {
        ...state,
        categoriesMap: payload
      }
    default:
        return state;
  }
}
