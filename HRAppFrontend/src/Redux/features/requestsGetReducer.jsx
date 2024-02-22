import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const requestGetSlice = createSlice({
  name: "getFeature",
  initialState,
  reducers: {
    getRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getRequestSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { getRequestStart, getRequestSuccess, getRequestFailure } =
requestGetSlice.actions;
export default requestGetSlice.reducer;




