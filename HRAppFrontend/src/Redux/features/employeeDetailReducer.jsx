import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const employeeDetailSlicer = createSlice({
  name: "getEmployeeDetails",
  initialState,
  reducers: {
    getDetailStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getDetailSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { getDetailStart, getDetailSuccess, getDetailFailure } =
employeeDetailSlicer.actions;
export default employeeDetailSlicer.reducer;




