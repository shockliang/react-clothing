import {InputHTMLAttributes} from "react";
import './form-input.styles';
import {FormInputLabel, Group, Input} from "./form-input.styles";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
}

const FormInput = ({label, ...otherProps}: FormInputProps) => {
  return (
    <Group>
      <Input {...otherProps}/>
      {label &&
        <FormInputLabel shrink={otherProps.value!.toString().length > 0}>
          {label}
        </FormInputLabel>
      }
    </Group>
  );
};

export default FormInput;
