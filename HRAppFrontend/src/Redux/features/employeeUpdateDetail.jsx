import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const employeeUpdateDetailSlice = createSlice({
  name: "getFeature",
  initialState,
  reducers: {
    getUpdateDetailStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUpdateDetailSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getUpdateDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { getUpdateDetailStart, getUpdateDetailSuccess, getUpdateDetailFailure } =
employeeUpdateDetailSlice.actions;
export default employeeUpdateDetailSlice.reducer;




