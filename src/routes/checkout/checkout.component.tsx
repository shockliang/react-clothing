import './checkout.styles.scss';
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

const Checkout = () => {
  const {cartItems, addItemToCart, removeItemFromCart} = useContext(CartContext);

  return (

    <div>
      {
        cartItems.map((cartItem) => {
          const {id, name, quantity} = cartItem;
          return (
            <div key={id}>
              <h2>{name}</h2>
              <span>{quantity}</span>
              <br/>
              <span onClick={() => addItemToCart(cartItem)}>+</span>
              <br />
              <span onClick={() => removeItemFromCart(cartItem)}>-</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default Checkout;
