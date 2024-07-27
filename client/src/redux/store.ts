import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profile";
import authReducer from "./slices/auth";
import jobReducer from "./slices/jobs";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
    jobs: jobReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
