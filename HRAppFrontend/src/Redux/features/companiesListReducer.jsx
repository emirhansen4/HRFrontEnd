import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const companiesGetSlice = createSlice({
  name: "getCompanies",
  initialState,
  reducers: {
    getCompaniesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCompaniesSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getCompaniesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { getCompaniesStart, getCompaniesSuccess, getCompaniesFailure } =
companiesGetSlice.actions;
export default companiesGetSlice.reducer;




