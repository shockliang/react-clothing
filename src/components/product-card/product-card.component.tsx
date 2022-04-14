import './product-card.styles.scss';
import Button, {ButtonStyle} from "../button/button.component";
import {Product} from "../../models/product";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

interface ProductCardProps {
  product: Product
}

const ProductCard = ({product}: ProductCardProps) => {
  const {addItemToCart} = useContext(CartContext);
  const {name, price, imageUrl} = product;

  const addProductToCart = () => addItemToCart(product);

  return (
    <div className={"product-card-container"}>
      <img src={imageUrl} alt={`${name}`}/>
      <div className={"footer"}>
        <span className={"name"}>{name}</span>
        <span className={"price"}>{price}</span>
      </div>
      <Button buttonType={ButtonStyle.Inverted} onClick={addProductToCart}>Add to cart</Button>
    </div>
  )
}

export default ProductCard;
