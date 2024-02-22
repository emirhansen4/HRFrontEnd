import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const leaveSlice = createSlice({
  name: "getLeave",
  initialState,
  reducers: {
    getLeaveStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getLeaveSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getLeaveFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { getLeaveStart, getLeaveSuccess, getLeaveFailure } =
leaveSlice.actions;
export default leaveSlice.reducer;




