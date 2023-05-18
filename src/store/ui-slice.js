import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: '',
  notificationFlag: false
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showNotification(state, action) {
      state.message = action.payload;
    },
    setNotificationFlag(state) {
      state.notificationFlag = !state.notificationFlag;
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;