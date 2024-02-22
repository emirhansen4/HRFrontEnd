import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const JobSlicer = createSlice({
  name: "getJobs",
  initialState,
  reducers: {
    getJobsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getJobsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getJobsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { getJobsStart, getJobsSuccess, getJobsFailure } =
JobSlicer.actions;
export default JobSlicer.reducer;




