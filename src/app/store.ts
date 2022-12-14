import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import rootReducers from "./rootReducers";
import appReducer from "./appSlice";
import ReduxLogger from "redux-logger";
const isDev = process.env.NODE_ENV === "development";

const persistConfig = {
  key: "primary",
  version: 1,
  storage,
  whitelist: ["darkmode"],
};

const rootReducer = combineReducers(rootReducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewareLogger: any = !!isDev ? logger : [];
console.log("REDUCER", persistedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ReduxLogger)
  // getDefaultMiddleware({
  //   serializableCheck: {
  //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //   },
  // }).concat(middlewareLogger),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
