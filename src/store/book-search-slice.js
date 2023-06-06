import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookResults: [],
  isLoading: false,
  searchTitle: "Search Result:",
};

const bookSearchSlice = createSlice({
  name: "bookSearch",
  initialState,
  reducers: {
    showBookResults(state, { payload }) {
      state.bookResults = payload;
    },
    changeLoadingStatus(state) {
      state.isLoading = !state.isLoading;
    },
    setSearchTitle(state, { payload }) {
      state.searchTitle = payload;
    },
  },
});

export const bookSearchActions = bookSearchSlice.actions;
export default bookSearchSlice;
