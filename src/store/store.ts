import logger from "redux-logger";
import {rootReducer, RootState} from "./root-reducer";
import {persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {useDispatch} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {UserActionTypes} from "./user/user.types";
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./root-saga";
import {PersistConfig} from "redux-persist/es/types";

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const middlewares = process.env.NODE_ENV !== 'production' ? [logger, sagaMiddleware] : [sagaMiddleware];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
          UserActionTypes.SET_CURRENT_USER,
          UserActionTypes.SIGN_IN_SUCCESS,
          UserActionTypes.SIGN_UP_SUCCESS
        ],
        ignoredPaths: ["user.currentUser"]
      },
    }).concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production'
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
