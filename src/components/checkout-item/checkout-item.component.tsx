import './checkout-item.styles.scss';
import {CartItemModel} from "../../models/cart-item";

interface CheckoutItemProps {
  cartItem: CartItemModel
}

const CheckoutItem = ({cartItem}: CheckoutItemProps) => {
  const {name, price, imageUrl, quantity} = cartItem;
  return (
    <div className={"checkout-item-container"}>
      <div className={"image-container"}>
        <img src={imageUrl} alt={name} />
      </div>
      <span className={"name"}>{name}</span>
      <span className={"quantity"}>{quantity}</span>
      <span className={"price"}>{price}</span>
      <div className={"remove-button"}>&#10005;</div>
    </div>
  )
};

export default CheckoutItem;
