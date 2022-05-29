import {UserActionTypes} from "../../store/user/user.types";
import {CategoriesActionTypes} from "../../store/categories/category.types";
import {CartActionTypes} from "../../store/cart/cart.types";
import {AnyAction} from "redux";

export const createCartAction = (type: CartActionTypes, payload: any) => {
  return {type, payload}
};

export const createUserAction = (type: UserActionTypes, payload: any) => {
  return {type, payload}
};

export const createCategoriesAction = (type: CategoriesActionTypes, payload: any) => {
  return {type, payload}
}

type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>['type'];
  match(action: AnyAction): action is ReturnType<AC>
}

export function withMatcher<AC extends () => AnyAction & {type: string}>(actionCreator: AC): Matchable<AC>;

export function withMatcher<AC extends (...args: any[]) => AnyAction & {type: string}>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    }
  })
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
