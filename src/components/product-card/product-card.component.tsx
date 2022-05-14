import './product-card.styles.scss';
import Button, {ButtonStyle} from "../button/button.component";
import {Product} from "../../models/product";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../../store/cart/cart.action";
import {selectCartItems} from "../../store/cart/cart.selector";

interface ProductCardProps {
  product: Product
}

const ProductCard = ({product}: ProductCardProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const {name, price, imageUrl} = product;

  const addProductToCart = () =>dispatch(addItemToCart(cartItems, product));

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
