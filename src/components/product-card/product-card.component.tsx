import './product-card.styles.scss';
import Button, {ButtonStyle} from "../button/button.component";
import {Product} from "../../models/product";

interface ProductCardProps {
  product: Product
}

const ProductCard = ({product}: ProductCardProps) => {
  const {name, price, imageUrl} = product;
  return (
    <div className={"product-card-container"}>
      <img src={imageUrl} alt={`${name}`}/>
      <div className={"footer"}>
        <span className={"name"}>{name}</span>
        <span className={"price"}>{price}</span>
        <Button buttonType={ButtonStyle.Inverted}>Add to cart</Button>
      </div>
    </div>
  )
}

export default ProductCard;
