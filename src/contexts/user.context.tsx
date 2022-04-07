import {createContext, FC, useState} from "react";
import {UserInfo} from "firebase/auth";

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
  return <UserContext.Provider value={{currentUser, setCurrentUser}}>{children}</UserContext.Provider>
}
