import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const retainerSlice = createSlice({
  name: "getReatiner",
  initialState,
  reducers: {
    getRetainerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getRetainerSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getRetainerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { getRetainerStart, getRetainerSuccess, getRetainerFailure } =
retainerSlice.actions;
export default retainerSlice.reducer;




