import React, {FC, ReactChildren} from "react";
import {BaseButton, GoogleSignInButton, InvertedButton} from "./button.styles";
import {Button as NextUIButton, Loading} from '@nextui-org/react';
import {ButtonProps} from "@nextui-org/react/types/button/button";


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

interface CustomNextUIButtonProps extends ButtonProps {
  children?: ReactChildren | ReactChildren[] | string | string[],
  buttonType?: ButtonStyle,
  isLoading?: boolean
}

const Button: FC<CustomNextUIButtonProps> = ({children, isLoading, buttonType, ...otherProps}: CustomNextUIButtonProps) => {
  return (
    <NextUIButton disabled={isLoading} {...otherProps} shadow color="gradient" auto>
      {isLoading
        ? <Loading type="points-opacity" color="currentColor" size="sm"/>
        : children}
    </NextUIButton>
  )
}

export default Button;
