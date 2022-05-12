import {RootState} from "../root-reducer";
import {Product} from "../../models/product";

export const selectCategoriesMap = (state: RootState) => state.categories.categories
  .reduce((acc, category) => {
    const {title, items} = category;

    acc.set(title.toLowerCase(), items);
    return acc;
  }, new Map<string, Product[]>());
;
