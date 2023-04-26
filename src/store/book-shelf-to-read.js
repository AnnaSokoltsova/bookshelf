import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booksToRead: []
}

const toReadSlice = createSlice({
  name: 'toRead',
  initialState,
  reducers: {
    addBookToShelf(state, action) {
      const newBook = action.payload;
      state.booksToRead.push({
        id: newBook.id,
        author: newBook.author,
        title: newBook.title,
        coverImg: newBook.coverImg
      })
    },
    removeFromBookShelf(state, action) {
      const id = action.payload;
      state.booksToRead = state.booksToRead.filter(book => book.id !== id);
    }
  }
})

export const toReadActions = toReadSlice.actions;

export default toReadSlice;