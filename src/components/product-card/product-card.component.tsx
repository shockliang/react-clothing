import './product-card.styles';
import {Product} from "../../models/product";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../../store/cart/cart.action";
import {selectCartItems} from "../../store/cart/cart.selector";
import {Card, Col, Row, Text, Button} from "@nextui-org/react";

interface ProductCardProps {
  product: Product
}

const ProductCard = ({product}: ProductCardProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const {name, price, imageUrl} = product;

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <Card css={{w: "100%", h: "400px"}}>
      {/*<Card.Header css={{position: "absolute", zIndex: 1, top: 5}}>*/}
      {/*  <Col>*/}
      {/*    <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">*/}
      {/*      New*/}
      {/*    </Text>*/}
      {/*    <Text h3 color="black">*/}
      {/*      Acme camera*/}
      {/*    </Text>*/}
      {/*  </Col>*/}
      {/*</Card.Header>*/}
      <Card.Body css={{p: 0}}>
        <Card.Image
          src={imageUrl}
          width="100%"
          height="100%"
          objectFit="cover"
          alt={name}
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#ffffff66",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Text color="#000" size={12}>
              {name}
            </Text>
            <Text color="#000" size={12}>
              ${price}
            </Text>
          </Col>
          <Col>
            <Row justify="flex-end">
              <Button flat auto rounded color="secondary" onClick={addProductToCart}>
                <Text
                  css={{color: "inherit"}}
                  size={12}
                  weight="bold"
                  transform="uppercase"
                >
                  Add to cart
                </Text>
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  )
}

export default ProductCard;
