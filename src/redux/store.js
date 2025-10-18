// redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./features/auth/authSlice";
import bookingReducer from "./features/booking/bookingSlice";

// Combine reducers (in case you have more later)
const rootReducer = combineReducers({
  auth: authReducer,
  booking: bookingReducer
});

// Configure persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "booking"], // Only persist auth slice
};

// Wrap reducer with persist capabilities
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);