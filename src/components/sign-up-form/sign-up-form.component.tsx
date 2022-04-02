import {ChangeEvent, FormEvent, FormEventHandler, SyntheticEvent, useState} from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

import './sign-up-form.styles.scss';

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

  // console.log(formFields);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      const response = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(response?.user, {displayName});
      resetFormFields();

    } catch (error: any) {
      if(error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      }
      console.log("User creation encountered an error", error);
    }
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  return (
    <div className={"sign-up-container"}>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Display Name"}
          type={"text"}
          required
          onChange={handleChange}
          name={"displayName"}
          value={displayName}
        />

        <FormInput
          label={"Email"}
          type={"email"}
          required
          onChange={handleChange}
          name={"email"}
          value={email}
        />

        <FormInput
          label={"Password"}
          type={"password"}
          required
          onChange={handleChange}
          name={"password"}
          value={password}
        />

        <FormInput
          label={"Confirm Password"}
          type={"password"}
          required
          onChange={handleChange}
          name={"confirmPassword"}
          value={confirmPassword}
        />

        <button type={"submit"}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
