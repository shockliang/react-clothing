import './cart-item.styles.scss';
import {CartItemModel} from "../../models/cart-item";

interface CartItemProps {
  cartItem: CartItemModel
}

const CartItem = ({cartItem}: CartItemProps) => {
  const {name, quantity} = cartItem;
  return (
    <div>
      <h2>{name}</h2>
      <span>{quantity}</span>
    </div>
  )
}

export default CartItem;
