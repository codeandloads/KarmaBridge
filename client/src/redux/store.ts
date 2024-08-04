import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profile";
import authReducer from "./slices/auth";
import jobReducer from "./slices/jobs";
import { jobsApi } from "./services/jobs/jobs.service";

export const store = configureStore({
  reducer: {
    [jobsApi.reducerPath]: jobsApi.reducer,
    profile: profileReducer,
    auth: authReducer,
    jobs: jobReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
