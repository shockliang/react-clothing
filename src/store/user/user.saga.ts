import {takeLatest, all, call, put} from 'typed-redux-saga/macro';
import {AdditionalInformation, createUserDocumentFromAuth, getCurrentUser} from "../../utils/firebase/firebase.utils";
import {UserActionTypes} from "./user.types";
import {User} from "firebase/auth";
import {signInFailed, signInSuccess} from "./user.action";

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
  try {
    const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails);
    console.log(userSnapshot);
    if(userSnapshot) {
      yield* put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    }

  }catch (error) {
    yield* put(signInFailed(error as Error))
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if(!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error))
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([call(onCheckUserSession)]);
}
