import {useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectCategoriesIsLoading, selectCategoriesMap} from "../../store/categories/category.selector";
import ProductCard from "../../components/product-card/product-card.component";
import './category.styles.scss';
import Spinner from "../../components/spinner/spinner.component";
import {CategoryItem} from "../../store/categories/category.types";

const Category = () => {
  const {category} = useParams();
  const categoryMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState<CategoryItem[]>(categoryMap[category!]);

  useEffect(() => {
    if (!category) return;
    const productsFromMap = categoryMap[category];

    if (!productsFromMap) return;

    setProducts(productsFromMap);
  }, [category, categoryMap])

  return (
    <Fragment>
      <h2 className={"category-title"}>{category?.toUpperCase()}</h2>
      {
        isLoading
          ? (<Spinner/>)
          : (
            <div className={"category-container"}>
              {
                products && products.map((product) => (<ProductCard key={product.id} product={product}/>))
              }
            </div>
          )
      }

    </Fragment>
  )
}

export default Category;
