import {Fragment} from "react";
import CategoryPreview from "../../components/category-prview/category-preview.component";
import {selectCategoriesMap} from "../../store/categories/category.selector";
import {useSelector} from "react-redux";

const CategoriesPreview = () => {
  const categoryMap = useSelector(selectCategoriesMap);
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
