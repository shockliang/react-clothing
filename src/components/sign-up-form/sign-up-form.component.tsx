import {ChangeEvent, FormEvent, FormEventHandler, SyntheticEvent, useState} from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

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

  console.log(formFields);

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
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          type={"text"}
          required
          onChange={handleChange}
          name={"displayName"}
          value={displayName}
        />

        <label>Email</label>
        <input
          type={"email"}
          required
          onChange={handleChange}
          name={"email"}
          value={email}
        />

        <label>Password</label>
        <input
          type={"password"}
          required
          onChange={handleChange}
          name={"password"}
          value={password}
        />

        <label>Confirm Password</label>
        <input
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
