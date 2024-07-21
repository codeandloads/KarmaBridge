import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profile";
import authReducer from "./slices/auth";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
