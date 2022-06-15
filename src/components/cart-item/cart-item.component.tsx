import './cart-item.styles';
import {CartItemModel} from "../../models/cart-item";
import {CartItemContainer, CartItemDetail} from "./cart-item.styles";

interface CartItemProps {
  cartItem: CartItemModel
}

const CartItem = ({cartItem}: CartItemProps) => {
  const {name, imageUrl, quantity, price} = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name}/>
      <CartItemDetail>
        <span>{name}</span>
        <span>{quantity} x ${price}</span>
      </CartItemDetail>
    </CartItemContainer>
  )
}

export default CartItem;
