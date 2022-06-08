import {FC, InputHTMLAttributes} from "react";
import './form-input.styles';
import {FormInputLabel, Group, Input} from "./form-input.styles";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
}

const FormInput: FC<FormInputProps> = ({label, ...otherProps}) => {
  return (
    <Group>
      <Input {...otherProps}/>
      {label &&
        <FormInputLabel
          shrink={Boolean(otherProps.value &&
            typeof otherProps.value === 'string' &&
            otherProps.value.length)}>
          {label}
        </FormInputLabel>
      }
    </Group>
  );
};

export default FormInput;
