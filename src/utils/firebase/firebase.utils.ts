import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';
import firebase from "firebase/compat";
import UserInfo = firebase.UserInfo;

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

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth: UserInfo) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {displayName, email, createdAt});
    } catch (e: any) {
      console.log('error creating the user', e.message);
    }
  }

  return userDocRef;
}
