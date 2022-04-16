import './cart-item.styles.scss';
import {CartItemModel} from "../../models/cart-item";

interface CartItemProps {
  cartItem: CartItemModel
}

const CartItem = ({cartItem}: CartItemProps) => {
  const {name, imageUrl, quantity, price} = cartItem;
  return (
    <div className={"cart-item-container"}>
      <img src={imageUrl} alt={name}/>
      <div className={"item-details"}>
        <span className={"name"}>{name}</span>
        <span className={"price"}>{quantity} x ${price}</span>
      </div>
    </div>
  )
}

export default CartItem;
