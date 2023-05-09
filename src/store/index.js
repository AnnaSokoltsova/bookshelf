import { configureStore } from "@reduxjs/toolkit";

import bookSearchSlice from "./book-search-slice";
import bookshelfSlice from "./bookshelf-slice";
import uiSlice from "./ui-slice";
import bookpageSlice from "./book-page-slice";

const store = configureStore({
  reducer: {
    bookSearch: bookSearchSlice.reducer,
    bookshelf: bookshelfSlice.reducer,
    ui: uiSlice.reducer,
    bookpage: bookpageSlice.reducer,
  },
});

export default store;
