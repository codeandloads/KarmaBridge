import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { JOB } from "karmabridge-types";

const initialState: JOB[] = [];

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (_state, action: PayloadAction<JOB[]>) => {
      return action.payload;
    },
  },
});

export const { setJobs } = jobSlice.actions;

export const selectJobs = (state: RootState) => state.jobs;

export default jobSlice.reducer;
