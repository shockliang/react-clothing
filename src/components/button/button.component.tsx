import React, {ButtonHTMLAttributes, FC, ReactChildren} from "react";
import {BaseButton, ButtonSpinner, GoogleSignInButton, InvertedButton} from "./button.styles";

export enum ButtonStyle {Google, Inverted}

const getButton = (buttonType: ButtonStyle | undefined): typeof BaseButton => {
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
  buttonType?: ButtonStyle,
  isLoading?: boolean
}

const Button: FC<ButtonProps> = ({children, isLoading, buttonType, ...otherProps}: ButtonProps) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner/> : children}
    </CustomButton>
  )
}

export default Button;
