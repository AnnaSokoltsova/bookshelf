import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookpage: {},
  isLoading: true,
};

const bookpageSlice = createSlice({
  name: "bookpage",
  initialState,
  reducers: {
    showPageData(state, { payload }) {
      state.bookpage = payload;
    },
    changeLoadingStatus(state, { payload }) {
      state.isLoading = payload;
    },
  },
});

export const bookpageActions = bookpageSlice.actions;

export default bookpageSlice;
