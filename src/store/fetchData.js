import { bookSearchActions } from "./book-search-slice";
let firstRender = true;

export const fetchBooksData = (searchedBookName) => {

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `http://openlibrary.org/search.json?q=${searchedBookName}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch books data!");
      }

      const data = await response.json();

      return data;
    };
    dispatch(bookSearchActions.changeLoadingStatus());
    dispatch(bookSearchActions.setSearchTitle(''));
    try {
      const data = await fetchData();
      const { docs } = data;
      console.log(docs)
      if (docs) {
        const newBooks = docs.slice(0, 20).map((bookSingle) => {
          const { key, author_name, cover_i, title } = bookSingle;
          return {
            id: key,
            author: author_name || ['Unknown'],
            cover_id: cover_i,
            title: title,
          };
        });
        dispatch(bookSearchActions.showBookResults(newBooks));
        dispatch(bookSearchActions.changeLoadingStatus());

        if (newBooks.length > 1) {
          dispatch(bookSearchActions.setSearchTitle("Search Result:"));
        } else {
          dispatch(bookSearchActions.setSearchTitle("No Search Result Found!"));
        }
      } else {
        dispatch(bookSearchActions.showBookResults([]));
    }
    } catch (error) {
      console.log(error);
      dispatch(bookSearchActions.setSearchTitle(error.message));
      dispatch(bookSearchActions.changeLoadingStatus());
    }
  };
};
