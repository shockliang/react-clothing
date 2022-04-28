import React, {ButtonHTMLAttributes, ReactChildren} from "react";
import {BaseButton, GoogleSignInButton, InvertedButton} from "./button.styles";

export enum ButtonStyle {Google, Inverted}

const getButton = (buttonType: ButtonStyle | undefined) => {
  switch (buttonType) {
    case ButtonStyle.Google:
      return GoogleSignInButton;
    case ButtonStyle.Inverted :
      return InvertedButton;
    default:
      return BaseButton;
  }
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactChildren | ReactChildren[] | string | string[],
  buttonType?: ButtonStyle
}

const Button = ({children, buttonType, ...otherProps}: ButtonProps) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton {...otherProps}>{children}</CustomButton>
  )
}

export default Button;
