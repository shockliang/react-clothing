import {Fragment, useContext} from "react";
import {CategoriesContext} from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-prview/category-preview.component";

const CategoriesPreview = () => {
  const {categoryMap} = useContext(CategoriesContext);
  let titles: string[] = [];
  categoryMap.forEach((value, key) => titles.push(key));
  return (
    <Fragment>
      {
        titles.map((title) => {
          const products = categoryMap.get(title);
          return (
            <CategoryPreview key={title} title={title} products={products!}/>
          )
        })
      }
    </Fragment>
  );
};

export default CategoriesPreview;
