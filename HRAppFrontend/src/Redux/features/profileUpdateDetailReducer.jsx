import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const profileUpdateDetailSlice = createSlice({
  name: "getFeature",
  initialState,
  reducers: {
    getProfileUpdateDetailStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProfileUpdateDetailSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getProfileUpdateDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { getProfileUpdateDetailStart, getProfileUpdateDetailSuccess, getProfileUpdateDetailFailure } =
profileUpdateDetailSlice.actions;
export default profileUpdateDetailSlice.reducer;




