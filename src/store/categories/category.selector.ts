import {RootState} from "../root-reducer";

export const selectCategoriesMap = (state: RootState) => state.categories.categoriesMap;
