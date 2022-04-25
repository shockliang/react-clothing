import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {CategoriesContext} from "../../contexts/categories.context";
import {Product} from "../../models/product";
import './category.styles.scss';
import ProductCard from "../../components/product-card/product-card.component";

const Category = () => {
  const {category} = useParams();
  const {categoryMap} = useContext(CategoriesContext);
  const [products, setProducts] = useState<Product[]>(categoryMap.get(category!)!)

  useEffect(() => {
    if(!category) return;
    const productsFromMap = categoryMap.get(category);

    if(!productsFromMap) return;

    setProducts(productsFromMap);
  }, [category, categoryMap])

  return (
    <div className={"category-container"}>
      {
        products && products.map((product) => (<ProductCard key={product.id} product={product}/>))
      }
    </div>
  )
}

export default Category;
