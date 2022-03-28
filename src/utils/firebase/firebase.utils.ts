import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "apikey",
  authDomain: "react-clothing-db-fea3e.firebaseapp.com",
  projectId: "react-clothing-db-fea3e",
  storageBucket: "react-clothing-db-fea3e.appspot.com",
  messagingSenderId: "672855843009",
  appId: "1:672855843009:web:e84a19e4829955301e7440"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
