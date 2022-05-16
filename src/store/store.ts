import {createStore, applyMiddleware} from "redux";
import logger from "redux-logger";
import {rootReducer} from "./root-reducer";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';

const persistConfig = {
  key: 'root',
  storage,
  blocklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = process.env.NODE_ENV !== 'production' ? [logger] : [];

const composedEnhancers = composeWithDevToolsDevelopmentOnly(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
