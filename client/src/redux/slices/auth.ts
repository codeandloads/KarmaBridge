import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { AuthInfo } from "karmabridge-types";

const initialState: AuthInfo = {
  accessToken: "",
  refreshToken: "",
  expiresIn: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthInfo>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.expiresIn = action.payload.expiresIn;
    },
    removeAuth: (state) => {
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
      state.expiresIn = initialState.expiresIn;
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export default authSlice.reducer;
