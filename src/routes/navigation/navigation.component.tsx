import {Fragment, useContext} from "react";
import {Outlet} from "react-router-dom";
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import {CartContext} from "../../contexts/cart.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import {NavigationContainer, NavLink, NavLinks, LogoContainer} from "./navigation.styles";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/user/user.selector";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const {isCartOpen} = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser();
  }

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to={"/"}>
          <CrownLogo className={"logo"}/>
        </LogoContainer>
        <NavLinks>
          <NavLink to={'/shop'}>
            SHOP
          </NavLink>

          {currentUser ? (
            <NavLink as={'span'} onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to={'/auth'}>
              SIGN IN
            </NavLink>
          )}

          <CartIcon/>
        </NavLinks>
        {isCartOpen && <CartDropdown/>}
      </NavigationContainer>
      <Outlet/>
    </Fragment>
  )
}

export default Navigation;
