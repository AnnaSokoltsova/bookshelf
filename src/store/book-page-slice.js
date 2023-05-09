import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookpage: {},
  isLoading: true,
};

const bookpageSlice = createSlice({
  name: "bookpage",
  initialState,
  reducers: {
    showPageData(state, action) {
      state.bookpage = action.payload
    },
    changeLoadingStatus(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const bookpageActions = bookpageSlice.actions;

export default bookpageSlice;