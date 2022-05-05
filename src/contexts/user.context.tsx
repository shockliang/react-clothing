import {createContext, FC, useEffect, useState, useReducer} from "react";
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

enum UserActionTypes {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
}

interface UserAction {
  type: UserActionTypes,
  payload: UserInfo | null | undefined
}

interface UserState {
  currentUser: UserInfo | null | undefined
}

const userReducer = (state: UserState, action: UserAction) => {
  console.log('dispatched', action);
  const {type, payload} = action;
  switch (type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
}

const INITIAL_STATE: UserState = {
  currentUser: null,
}

export const UserProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const {currentUser} = state;
  console.log('UserProvider current user', currentUser);
  const setCurrentUser = (user: UserInfo | undefined) => {
    dispatch({type: UserActionTypes.SET_CURRENT_USER, payload: user});
  }

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
