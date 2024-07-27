import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { JOB, TYPES } from "karmabridge-types";

const initialState: JOB = {
  category: { id: "", title: "", jobs: null },
  categoryId: 0,
  location: {
    id: 0,
    city: "",
    country: "",
    PostCode: "",
    state: "",
    street: "",
    suburb: "",
  },
  longDescription: "",
  shortDescription: "",
  title: "",
  id: "",
  type: 3 as TYPES.Casual,
};

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<JOB>) => {
      state = action.payload;
    },
  },
});

export const { setJobs } = jobSlice.actions;

export const selectJobs = (state: RootState) => state.jobs;

export default jobSlice.reducer;
