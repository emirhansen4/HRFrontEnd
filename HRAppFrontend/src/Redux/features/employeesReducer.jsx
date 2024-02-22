import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const employeesSlicer = createSlice({
  name: "getEmployees",
  initialState,
  reducers: {
    getStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { getStart, getSuccess, getFailure } =
employeesSlicer.actions;
export default employeesSlicer.reducer;




