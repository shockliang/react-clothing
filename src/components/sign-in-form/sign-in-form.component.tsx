import {ChangeEvent, FormEvent, useState} from "react";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, {ButtonStyle} from "../button/button.component";

import './sign-in-form.styles.scss';
import {useDispatch} from "react-redux";
import {emailSignInStart, googleSignInStart} from "../../store/user/user.action";

interface DefaultFormFields {
  email: string,
  password: string,
}

const defaultFormFields: DefaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState<DefaultFormFields>(defaultFormFields);
  const {email, password} = formFields;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
