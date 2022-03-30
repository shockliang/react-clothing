import {useEffect} from "react";
import {getRedirectResult} from 'firebase/auth'

import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  useEffect( () => {
    const getRedirectResultResponse = async () => {
      const response = await getRedirectResult(auth);
      console.log(response);
      if(response) {
        const userDocRef = await createUserDocumentFromAuth(response?.user);
        console.log(userDocRef);
      }
    }
    getRedirectResultResponse().finally();

  }, []);

  const loginGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(userDocRef);
  }

    return (
      <div>
        <h1>Sign in Page</h1>
        <button onClick={loginGoogleUser}>
          Sign in with Google Popup
        </button>
        <button onClick={signInWithGoogleRedirect}>
          Sign in with Google Redirect
        </button>
      </div>
    );
  };

  export default SignIn;
