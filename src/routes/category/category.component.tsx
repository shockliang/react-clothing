import {useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import {Product} from "../../models/product";
import {useSelector} from "react-redux";
import {selectCategoriesMap} from "../../store/categories/category.selector";
import ProductCard from "../../components/product-card/product-card.component";
import './category.styles.scss';

const Category = () => {
  const {category} = useParams();
  const categoryMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState<Product[]>(categoryMap.get(category!)!)

  useEffect(() => {
    if (!category) return;
    const productsFromMap = categoryMap.get(category);

    if (!productsFromMap) return;

    setProducts(productsFromMap);
  }, [category, categoryMap])

  return (
    <Fragment>
      <h2 className={"category-title"}>{category?.toUpperCase()}</h2>
      <div className={"category-container"}>
        {
          products && products.map((product) => (<ProductCard key={product.id} product={product}/>))
        }
      </div>
    </Fragment>
  )
}

export default Category;
