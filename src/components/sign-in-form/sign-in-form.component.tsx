import {ChangeEvent, FormEvent, useState} from "react";
import React from "react";
import Button, {ButtonStyle} from "../button/button.component";
import './sign-in-form.styles';
import {useDispatch} from "react-redux";
import {emailSignInStart, googleSignInStart} from "../../store/user/user.action";
import {ButtonsContainer, SignUpContainer} from "./sign-in-form.styles";
import { Input, useInput, Grid } from "@nextui-org/react";
import {FormElement} from "@nextui-org/react/types/input/input-props";


interface DefaultFormFields {
  email: string,
  password: string,
}

const defaultFormFields: DefaultFormFields = {
  email: '',
  password: '',
}

type SimpleColors =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error';

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState<DefaultFormFields>(defaultFormFields);
  const {email, password} = formFields;

  const handleChange = (event: ChangeEvent<FormElement>) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error: any) {
      alert("Auth encountered an error");
      console.log(error);
    }
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogleUser = async () => {
    dispatch(googleSignInStart());
  }

  return (
    <SignUpContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <Grid.Container gap={4}>
          <Grid>
            <Input
              clearable
              helperText="Please enter your email"
              label="Email"
              type={"email"}
              placeholder="Enter your email"
              onChange={handleChange}
              required
              name={"email"}
            />
          </Grid>
          <Grid>
            <Input.Password
              clearable
              color="default"
              type="password"
              label="Password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid.Container>
        <ButtonsContainer>
          <Button type={"submit"}>Sign In</Button>
          <Button type={"button"} onClick={signInWithGoogleUser} buttonType={ButtonStyle.Google}>
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignUpContainer>
  );
};

export default SignInForm;
