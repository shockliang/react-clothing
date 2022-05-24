import {takeLatest, all, call, put} from 'typed-redux-saga/macro';
import {
  AdditionalInformation,
  createUserDocumentFromAuth,
  getCurrentUser, signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import {UserAction, UserActionTypes} from "./user.types";
import {User, UserInfo} from "firebase/auth";
import {EmailSignInStart, signInFailed, signInSuccess} from "./user.action";

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
  try {
    const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails);
    console.log(userSnapshot);
    if (userSnapshot) {
      yield* put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    }
  } catch (error) {
    yield* put(signInFailed(error as Error))
  }
}

export function* signInWithEmail({payload: {email, password}}: EmailSignInStart) {
  try {
    const userCredential = yield* call(signInAuthUserWithEmailAndPassword,
      email, password);

    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error))
  }
}

export function* signInWithGoogle() {
  try {
    const {user} = yield* call(signInWithGooglePopup)
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error))
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error))
  }
}

export function* onEmailSignInStart() {
  yield* takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield* takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart)
  ]);
}
