import { createSlice } from "@reduxjs/toolkit";
import greatGatsby from "../images/covers/greatgatsby.jpeg";
import theHobbit from '../images/covers/thehobbit.jpeg';
import harryPotter from '../images/covers/harrypotter.jpeg';
import duneMessiah from '../images/covers/dunemessiah.jpeg';

const initialState = {
  bookResults: [
    {
      id: "The Hobbit",
      author: ["J.R.R. Tolkien"],
      cover_img: theHobbit,
      title: "The Hobbit",
    },
    {
      id: "The Great Gatsby",
      author: ["F. Scott Fitzgerald"],
      cover_img: greatGatsby,
      title: "The Great Gatsby",
    },
    {
      id: "Harry Potter and the Prisoner of Azkaban",
      author: ["J. K. Rowling"],
      cover_img: harryPotter,
      title: "Harry Potter and the Prisoner of Azkaban",
    },
    {
      id: "Dune Messiah",
      author: ["Frank Herbert"],
      cover_img: duneMessiah,
      title: "Dune Messiah",
    },
  ],
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
