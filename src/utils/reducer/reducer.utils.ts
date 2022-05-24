import {UserActionTypes} from "../../store/user/user.types";
import {CategoriesActionTypes} from "../../store/categories/category.types";
import {CartActionTypes} from "../../store/cart/cart.types";

export const createCartAction = (type: CartActionTypes, payload: any) => {
  return {type, payload}
};

export const createUserAction = (type: UserActionTypes, payload: any) => {
  return {type, payload}
};

export const createCategoriesAction = (type: CategoriesActionTypes, payload: any) => {
  return {type, payload}
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};
