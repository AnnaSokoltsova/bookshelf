import { configureStore } from "@reduxjs/toolkit";

import bookSearchSlice from "./book-search-slice";
import bookshelfSlice from "./bookshelf-slice";

const store = configureStore({
  reducer: {bookSearch: bookSearchSlice.reducer, bookshelf: bookshelfSlice.reducer}
})

export default store;