import { bookSearchActions } from "./book-search-slice";
import { bookpageActions } from "./book-page-slice";
import missingCover from "../images/missingcover.png";

function truncate(str) {
  return str.length > 30 ? str.substring(0, 28) + "..." : str;
}

export const fetchBooksData = (searchedBook) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `http://openlibrary.org/search.json?title=${searchedBook}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch books data!");
      }

      const data = await response.json();

      return data;
    };

    dispatch(bookSearchActions.changeLoadingStatus());
    dispatch(bookSearchActions.setSearchTitle(""));
    try {
      const { docs } = await fetchData();
     
      if (docs) {
        const newBooks = docs
          .slice(0, 20)
          .map(({ key, author_name, cover_i, title }) => ({
            id: key.substring(7),
            author: author_name ? truncate(author_name.join(", ")) : "Unknown",
            coverImg: cover_i
              ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`
              : missingCover,
            title: truncate(title),
          }));
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
     
      dispatch(bookSearchActions.setSearchTitle(error.message));
      dispatch(bookSearchActions.changeLoadingStatus());
    }
  };
};

export const fetchWorksData = (id) => {
  return async (dispatch) => {
    dispatch(bookpageActions.changeLoadingStatus(true));
    const fetchWorkData = async () => {
      const response = await fetch(`https://openlibrary.org/works/${id}.json`);

      if (!response.ok) {
        throw new Error("Could not fetch work data!");
      }

      const data = await response.json();

      return data;
    };

    const fetchAuthorData = async (authorId) => {
      const response = await fetch(`https://openlibrary.org${authorId}.json`);

      if (!response.ok) {
        throw new Error("Could not fetch author data!");
      }

      const data = await response.json();

      return data;
    };
    dispatch(bookpageActions.showPageData({}));

    try {
      const data = await fetchWorkData();
      const authorId = data.authors[0].author.key;

      const {name} = await fetchAuthorData(authorId);

      
      let subjects;

      if (data.subjects) {
        const subjectsList = [...data.subjects];
        const subjectsSubset =
          subjectsList.length > 30 ? subjectsList.slice(0, 30) : subjectsList;

        subjects = subjectsSubset.join("', '");
      }

      const bookData = {
        author: name,
        title: data.title,
        coverImg: (data.covers?.length > 0) 
          ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
          : missingCover,
        description: data.description?.value ? data.description.value : data.description ? data.description : "",
        subjects,
      };
      dispatch(bookpageActions.showPageData(bookData));
      dispatch(bookpageActions.changeLoadingStatus(false));
    } catch (error) {
      
      dispatch(bookpageActions.changeLoadingStatus(false));
    }
  };
};
