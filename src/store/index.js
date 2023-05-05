import { configureStore } from "@reduxjs/toolkit";

import bookSearchSlice from "./book-search-slice";
import bookshelfSlice from "./bookshelf-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {bookSearch: bookSearchSlice.reducer, bookshelf: bookshelfSlice.reducer, ui: uiSlice.reducer}
})

export default store;