import {InputHTMLAttributes} from "react";
import './form-input.styles.scss';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
}

const FormInput = ({label, ...otherProps}: FormInputProps) => {
  return (
    <div className={"group"}>
      <input className={'form-input'} {...otherProps}/>
      {label &&
        <label className={`${otherProps.value!.toString().length > 0 ? 'shrink' : ''} form-input-label`}>
          {label}
        </label>
      }
    </div>
  );
};

export default FormInput;
