import {Fragment, useContext} from "react";
import {CategoriesContext} from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import './shop.styles.scss';

const Shop = () => {
  const {categoryMap} = useContext(CategoriesContext);
  let titles: string[] = [];
  categoryMap.forEach((value, key) => titles.push(key));
  return (
    <Fragment>
      {
        titles.map((title) => (
          <Fragment key={title}>
            <h2>{title}</h2>
            <div className={"products-container"}>
              {
                categoryMap.get(title)!.map((product) => (
                  <ProductCard key={product.id} product={product}/>
                ))
              }
            </div>
          </Fragment>
        ))
      }
    </Fragment>
  );
};

export default Shop;
