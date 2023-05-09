import { createSlice } from "@reduxjs/toolkit";
import greatGatsby from "../images/covers/greatgatsby.jpeg";
import theHobbit from '../images/covers/thehobbit.jpeg';
import harryPotter from '../images/covers/harrypotter.jpeg';
import duneMessiah from '../images/covers/dunemessiah.jpeg';

const initialState = {
  bookResults: [
    // {
    //   id: "The Hobbit",
    //   author: ["J.R.R. Tolkien"],
    //   coverImg: theHobbit,
    //   title: "The Hobbit",
    // },
    // {
    //   id: "The Great Gatsby",
    //   author: ["F. Scott Fitzgerald"],
    //   coverImg: greatGatsby,
    //   title: "The Great Gatsby",
    // },
    // {
    //   id: "Harry Potter and the Prisoner of Azkaban",
    //   author: ["J. K. Rowling"],
    //   coverImg: harryPotter,
    //   title: "Harry Potter and the Prisoner of Azkaban",
    // },
    // {
    //   id: "Dune Messiah",
    //   author: ["Frank Herbert"],
    //   coverImg: duneMessiah,
    //   title: "Dune Messiah",
    // },
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
