import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
};

const bookshelfSlice = createSlice({
  name: "bookshelf",
  initialState,
  reducers: {
    replaceBookshelf(state, { payload }) {
      state.books = payload;
    },
    addBookToShelf(state, { payload: { id, author, title, coverImg } }) { 
      const existingBook = state.books.find((book) => book.id === id);
      if (!existingBook) {
        state.books.push({
          id: id,
          author: author,
          title: title,
          coverImg: coverImg,
          comments: [],
          isFavorite: true,
          inProgressStatus: false,
          completedStatus: false,
        });
      }
    },
    removeFromBookShelf(state, { payload }) {
      const id = payload;
      state.books = state.books.filter((book) => book.id !== id);
    },
    startReading(state, { payload }) {
      const id = payload;
      const bookInProgress = state.books.find((book) => book.id === id);
      bookInProgress.inProgressStatus = true;
      bookInProgress.isFavorite = false;
    },
    stopReading(state, { payload }) {
      const id = payload;
      const bookInProgress = state.books.find((book) => book.id === id);
      bookInProgress.inProgressStatus = false;
      bookInProgress.isFavorite = true;
    },
    finishTheBook(state, { payload }) {
      const id = payload;
      const finishedBook = state.books.find((book) => book.id === id);
      finishedBook.inProgressStatus = false;
      finishedBook.completedStatus = true;
    },
    addComment(state, { payload: {pageid, commentId, comment} }) {
      const reviewedBook = state.books.find((book) => book.id === pageid);
      reviewedBook.comments.unshift({ commentId, text: comment });
    },
    removeComment(state, { payload : {id, pageid} }) {
      const reviewedBook = state.books.find((book) => book.id === pageid);
      reviewedBook.comments = reviewedBook.comments.filter(
        (comment) => comment.commentId !== id
      );
    },
  },
});

export const bookshelfActions = bookshelfSlice.actions;

export default bookshelfSlice;
