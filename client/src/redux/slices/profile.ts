import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { UserInfo } from "karmabridge-types";

const initialState: UserInfo = {
  FirstName: "",
  LastName: "",
  Email: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setInfo: (state, action: PayloadAction<UserInfo>) => {
      state = action.payload;
    },
  },
});

export const { setInfo } = profileSlice.actions;

export const selectCurrentUser = (state: RootState) => state.profile;

export default profileSlice.reducer;
