import {ButtonHTMLAttributes, ReactChildren} from "react";
import './button.styles.scss';

export enum ButtonStyle {Google, Inverted}

function getButtonTypeName(buttonType: ButtonStyle | undefined) {
  switch (buttonType) {
    case ButtonStyle.Google:
      return 'google-sign-in'
    case ButtonStyle.Inverted:
      return 'inverted'
    default:
      return ''
  }
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactChildren | ReactChildren[] | string | string[],
  buttonType?: ButtonStyle
}

const Button = ({children, buttonType, ...otherProps}: ButtonProps) => {
  return (
    <button
      className={`button-container ${getButtonTypeName(buttonType)}`}
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default Button;
