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

export type Action<T> = {
  type: T;
}

export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

export function createAction<T extends string, p>(type: T, P: void): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return {type, payload};
}
