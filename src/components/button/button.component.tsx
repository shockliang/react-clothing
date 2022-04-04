import {ButtonHTMLAttributes, ReactChildren} from "react";
import './button.styles.scss';

const BUTTON_TYPE_CLASSES:Record<string, string> = {};
BUTTON_TYPE_CLASSES.google = 'google-sign-in';
BUTTON_TYPE_CLASSES.inverted = 'inverted';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactChildren | ReactChildren[] | string | string[],
  buttonType?: string
}

const Button = ({children, buttonType, ...otherProps}: ButtonProps) => {
  return (
    <button
      className={`button-container ${(buttonType === undefined ? '' : BUTTON_TYPE_CLASSES[buttonType])}`}
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default Button;
