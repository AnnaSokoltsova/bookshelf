import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  bookDuplicate: false,
  inProgress: false,
  completed: false,
};

const bookshelfSlice = createSlice({
  name: "bookshelf",
  initialState,
  reducers: {
    replaceBookshelf(state, action) {
      state.books = action.payload
    },
    addBookToShelf(state, action) {
      const newBook = action.payload;
      const existingBook = state.books.find((book) => book.id === newBook.id);
      if (!existingBook) {
        state.books.push({
          id: newBook.id,
          author: newBook.author,
          title: newBook.title,
          coverImg: newBook.coverImg,
          isFavorite: true,
          inProgressStatus: false,
          completedStatus: false,
        });
      } else {
        state.bookDuplicate = true;
      }
      
    },
    removeFromBookShelf(state, action) {
      const id = action.payload;
      state.books = state.books.filter((book) => book.id !== id);
      
    },
    startReading(state, action) {
      const id = action.payload;
      const bookInProgress = state.books.find((book) => book.id === id);
      bookInProgress.inProgressStatus = true;
      bookInProgress.isFavorite = false;
    },
    stopReading(state, action) {
      const id = action.payload;
      const bookInProgress = state.books.find((book) => book.id === id);
      bookInProgress.inProgressStatus = false;
      bookInProgress.isFavorite = true;
    },
    finishTheBook(state, action) {
      const id = action.payload;
      const finishedBook = state.books.find((book) => book.id === id);
      finishedBook.inProgressStatus = false;
      finishedBook.completedStatus = true;
    }
  },
});

export const bookshelfActions = bookshelfSlice.actions;

export default bookshelfSlice;
