import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { JOBS_RESPONSE } from "karmabridge-types";

const initialState: JOBS_RESPONSE = {
  jobs: [],
  totalRows: 0,
};

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (_state, action: PayloadAction<JOBS_RESPONSE>) => {
      return action.payload;
    },
  },
});

export const { setJobs } = jobSlice.actions;

export const selectJobs = (state: RootState) => state.jobs;

export default jobSlice.reducer;
