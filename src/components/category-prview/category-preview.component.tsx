import './category-privew.styles.scss';
import {Product} from "../../models/product";
import ProductCard from "../product-card/product-card.component";

interface CategoryPreviewProps {
  title: string,
  products: Product[]
}

const CategoryPreview = ({title, products}: CategoryPreviewProps) => {
  return (
    <div className={"category-preview-container"}>
      <h2>
        <span className={"title"}>{title.toUpperCase()}</span>
      </h2>
      <div className={"preview"}>
        {
          products
            .filter((_, idx) => idx < 4)
            .map((product) => (<ProductCard key={product.id} product={product} />))
        }
      </div>
    </div>
  )
}

export default CategoryPreview;
