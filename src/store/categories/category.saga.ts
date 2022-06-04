import {takeLatest, all, call, put} from 'typed-redux-saga'
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {fetchCategoriesFailed, fetchCategoriesSuccess} from "./category.action";
import {CategoriesActionTypes} from "./category.types";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(getCategoriesAndDocuments);
    yield* put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(CategoriesActionTypes.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
