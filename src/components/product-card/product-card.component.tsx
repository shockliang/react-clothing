import './product-card.styles';
import Button, {ButtonStyle} from "../button/button.component";
import {Product} from "../../models/product";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../../store/cart/cart.action";
import {selectCartItems} from "../../store/cart/cart.selector";
import {Footer, ProductCardContainer, Name, Price} from "./product-card.styles";

interface ProductCardProps {
  product: Product
}

const ProductCard = ({product}: ProductCardProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const {name, price, imageUrl} = product;

  const addProductToCart = () =>dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`}/>
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button buttonType={ButtonStyle.Inverted} onClick={addProductToCart}>Add to cart</Button>
    </ProductCardContainer>
  )
}

export default ProductCard;
