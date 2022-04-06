import {ChangeEvent, FormEvent, useState} from "react";
import {
  createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

import './sign-in-form.styles.scss';
import Button from "../button/button.component";

interface DefaultFormFields {
  email: string,
  password: string,
}

const defaultFormFields: DefaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState<DefaultFormFields>(defaultFormFields);
  const {email, password} = formFields;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(response);
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
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user, {});
  }

  return (
    <div className={"sign-up-container"}>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className={"buttons-container"}>
          <Button type={"submit"}>Sign In</Button>
          <Button type={"button"} onClick={signInWithGoogleUser} buttonType={ButtonStyle.Google}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
