import {useContext} from "react";
import {CategoriesContext} from "../../contexts/categories.context";
import './shop.styles.scss';
import CategoryPreview from "../../components/category-prview/category-preview.component";

const Shop = () => {
  const {categoryMap} = useContext(CategoriesContext);
  let titles: string[] = [];
  categoryMap.forEach((value, key) => titles.push(key));
  return (
    <div className={"shop-container"}>
      {
        titles.map((title) => {
          const products = categoryMap.get(title);
          return (
            <CategoryPreview key={title} title={title} products={products!}/>
          )
        })
      }
    </div>
  );
};

export default Shop;
