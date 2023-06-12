import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: ''
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showNotification(state, action) {
      state.message = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;