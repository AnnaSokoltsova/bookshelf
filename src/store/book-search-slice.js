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
    showBookResults(state, action) {
      state.bookResults = action.payload;
    },
    changeLoadingStatus(state) {
      state.isLoading = !state.isLoading;
    },
    setSearchTitle(state, action) {
      state.searchTitle = action.payload;
    },
  },
});

export const bookSearchActions = bookSearchSlice.actions;
export default bookSearchSlice;
