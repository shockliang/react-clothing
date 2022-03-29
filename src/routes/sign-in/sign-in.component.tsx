import {createUserDocumentFromAuth, signInWithGooglePopup} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
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
    </div>
  );
};

export default SignIn;
