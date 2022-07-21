import {ChangeEvent, FormEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {AuthError, AuthErrorCodes} from 'firebase/auth';
import {signUpStart} from "../../store/user/user.action";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles';
import {SignUpContainer} from "./sign-up-form.styles";
import { Input, Grid } from "@nextui-org/react";
import {FormElement} from "@nextui-org/react/types/input/input-props";

interface DefaultFormFields {
  displayName: string,
  email: string,
  password: string,
  confirmPassword: string
}

const defaultFormFields: DefaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState<DefaultFormFields>(defaultFormFields);
  const {displayName, email, password, confirmPassword} = formFields;
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<FormElement>) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password do not match")
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert('Cannot create user, email already in use');
      }
      console.log("User creation encountered an error", error);
    }
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <Grid.Container gap={4}>
          <Grid>
            <Input
              label={"Display Name"}
              type={"text"}
              required
              onChange={handleChange}
              name={"displayName"}
              value={displayName}
            />
          </Grid>
          <Grid>
            <Input
              label={"Email"}
              type={"email"}
              required
              onChange={handleChange}
              name={"email"}
              value={email}
            />
          </Grid>
          <Grid>
            <Input
              label={"Password"}
              type={"password"}
              required
              onChange={handleChange}
              name={"password"}
              value={password}
            />
          </Grid>
          <Grid>
            <Input
              label={"Confirm Password"}
              type={"password"}
              required
              onChange={handleChange}
              name={"confirmPassword"}
              value={confirmPassword}
            />
          </Grid>
        </Grid.Container>
        {/*<FormInput*/}
        {/*  label={"Display Name"}*/}
        {/*  type={"text"}*/}
        {/*  required*/}
        {/*  onChange={handleChange}*/}
        {/*  name={"displayName"}*/}
        {/*  value={displayName}*/}
        {/*/>*/}

        {/*<FormInput*/}
        {/*  label={"Email"}*/}
        {/*  type={"email"}*/}
        {/*  required*/}
        {/*  onChange={handleChange}*/}
        {/*  name={"email"}*/}
        {/*  value={email}*/}
        {/*/>*/}

        {/*<FormInput*/}
        {/*  label={"Password"}*/}
        {/*  type={"password"}*/}
        {/*  required*/}
        {/*  onChange={handleChange}*/}
        {/*  name={"password"}*/}
        {/*  value={password}*/}
        {/*/>*/}

        {/*<FormInput*/}
        {/*  label={"Confirm Password"}*/}
        {/*  type={"password"}*/}
        {/*  required*/}
        {/*  onChange={handleChange}*/}
        {/*  name={"confirmPassword"}*/}
        {/*  value={confirmPassword}*/}
        {/*/>*/}

        <Button type={"submit"}>Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
