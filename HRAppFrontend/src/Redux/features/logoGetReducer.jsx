import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const logoSlice = createSlice({
  name: "getLogo",
  initialState,
  reducers: {
    getlogo: (state, action) =>( {
      state: action.payload
    })
  },
});

export const { getlogo } = logoSlice.actions;

export default logoSlice.reducer;