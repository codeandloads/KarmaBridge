import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ProfileState {
  imageUrl?: string;
  FirstName: string;
  LastName: string;
  Email: string;
}

const initialState: ProfileState = {
  FirstName: "",
  LastName: "",
  Email: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setInfo: (state, action: PayloadAction<ProfileState>) => {
      state = action.payload;
    },
  },
});

export const { setInfo } = profileSlice.actions;

export const selectCurrentUser = (state: RootState) => state.profile;

export default profileSlice.reducer;
