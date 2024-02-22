import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const companyDetailGetSlice = createSlice({
  name: "getcompanyDetail",
  initialState,
  reducers: {
    getCompanyDetailStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCompanyDetailSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getCompanyDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getCompanyDetailStart,
  getCompanyDetailSuccess,
  getCompanyDetailFailure,
} = companyDetailGetSlice.actions;
export default companyDetailGetSlice.reducer;
