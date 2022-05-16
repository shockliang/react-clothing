import {compose, createStore, applyMiddleware} from "redux";
import logger from "redux-logger";
import {rootReducer} from "./root-reducer";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blocklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [logger];
const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
