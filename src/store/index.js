import { configureStore } from "@reduxjs/toolkit";

import bookSearchSlice from "./book-search";
import toReadSlice from "./book-shelf-to-read";

const store = configureStore({
  reducer: {bookSearch: bookSearchSlice.reducer, toRead: toReadSlice.reducer}
})

export default store;