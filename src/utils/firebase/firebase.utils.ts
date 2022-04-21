import {initializeApp} from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  UserInfo
} from 'firebase/auth'
import {
  getFirestore, doc, getDoc, setDoc,
  collection, writeBatch, query, getDocs,
  CollectionReference,
} from 'firebase/firestore';
import {ShopData} from "../../models/shop-data";
import {Product} from "../../models/product";

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

const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleAuthProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleAuthProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey: string, objectsToAdd: ShopData[]) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('batch done');
}

export const getCategoriesAndDocuments = async () => {

  const collectionRef = collection(db, 'categories') as CollectionReference<ShopData>
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categories = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const {title, items} = docSnapshot.data();

    acc.set(title.toLowerCase(), items);
    return acc;
  }, new Map<string, Product[]>() );

  return categories;
};

export const createUserDocumentFromAuth = async (userAuth: UserInfo | undefined, additionalInformation: any) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (e: any) {
      console.log('error creating the user', e.message);
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<UserInfo>) => onAuthStateChanged(auth, callback);
