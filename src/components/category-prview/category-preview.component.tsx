import './category-privew.styles.scss';
import {Product} from "../../models/product";
import ProductCard from "../product-card/product-card.component";
import {Link} from "react-router-dom";

interface CategoryPreviewProps {
  title: string,
  products: Product[]
}

const CategoryPreview = ({title, products}: CategoryPreviewProps) => {
  return (
    <div className={"category-preview-container"}>
      <h2>
        <Link to={title} className={"title"}>
          {title.toUpperCase()}
        </Link>
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
