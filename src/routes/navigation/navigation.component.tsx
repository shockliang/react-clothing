import {Fragment} from "react";
import {Outlet} from "react-router-dom";
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import {NavigationContainer, NavLink, NavLinks, LogoContainer} from "./navigation.styles";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/user/user.selector";
import {selectIsCartOpen} from "../../store/cart/cart.selector";
import {signOutStart} from "../../store/user/user.action";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutHandler = () => dispatch(signOutStart());

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
