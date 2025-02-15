/*  import { configureStore } from "@reduxjs/toolkit";
 import filterReducer from "./filters/slice";
import contactReducer from "./contacts/slice";
import { authReducer } from "./auth/slice";
 
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

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["token"],
};
 */
/* const persistedReducer =  */

/* export const store = configureStore({
  reducer: {
      contacts: contactReducer,
    filters: filterReducer,
    auth: persistReducer(persistConfig, authReducer), 
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);  */

import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "./campers/slice.js";

const store = configureStore({
  reducer: {
    campers: campersReducer, // Додаємо редюсер кемперів
  },
  devTools: import.meta.env.VITE_NODE_ENV !== "production", // Увімкнення Redux DevTools у режимі розробки
});

export default store;
