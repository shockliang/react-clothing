import {RootState} from "../root-reducer";
import {Product} from "../../models/product";
import {createSelector} from "reselect";

const selectCategoryReducer = (state: RootState) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => categories
    .reduce((acc, category) => {
      const {title, items} = category;

      acc.set(title.toLowerCase(), items);
      return acc;
    }, new Map<string, Product[]>())
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
