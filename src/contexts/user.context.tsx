import {createContext, FC, useEffect, useState} from "react";
import {UserInfo} from "firebase/auth";
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "../utils/firebase/firebase.utils";

interface UserContextInterface {
  currentUser: UserInfo | null | undefined
  setCurrentUser: (user: UserInfo | undefined) => void
}

const defaultState: UserContextInterface = {
  currentUser: null,
  setCurrentUser: () => null
}

export const UserContext = createContext<UserContextInterface>(defaultState);

export const UserProvider: FC = ({children}) => {
  const [currentUser, setCurrentUser] = useState<UserInfo>();

  useEffect(() => {
    return onAuthStateChangedListener((user) => {
      console.log('user context useEffect', user);
      if (user) {
        createUserDocumentFromAuth(user, {});
      }

      setCurrentUser(user!);
    });
  }, []);

  return <UserContext.Provider value={{currentUser, setCurrentUser}}>{children}</UserContext.Provider>
}
