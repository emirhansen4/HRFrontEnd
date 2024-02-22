import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const locationsSlicer = createSlice({
  name: "getLocations",
  initialState,
  reducers: {
    getLocationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getLocationSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getLocationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { getLocationStart, getLocationSuccess, getLocationFailure } =
locationsSlicer.actions;
export default locationsSlicer.reducer;




