import { bookSearchActions } from "./book-search-slice";
import { bookpageActions } from "./book-page-slice";
import missingCover from "../images/missingcover.png";

function truncate(str) {
  return str.length > 30 ? str.substring(0, 28) + "..." : str;
};

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
      const data = await fetchData();
      const { docs } = data;
      console.log(docs);
      if (docs) {
        const newBooks = docs.slice(0, 20).map((bookSingle) => {
          const { key, author_name, cover_i, title } = bookSingle;

          const newId = key.substring(7);

          let authorNames;
          let titleName = truncate(title);

          if (author_name) {
            const authors = author_name.join(", ");
            authorNames = truncate(authors);
          }

          return {
            id: newId,
            author: authorNames || ["Unknown"],
            coverImg: cover_i
              ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`
              : missingCover,
            title: titleName,
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
     
      console.log(data.subjects);
      const authorId = data.authors[0].author.key;

      const authorData = await fetchAuthorData(authorId);

      
      let coverId = "";
      let description = "";
      let subjects;

      if (data.subjects) {
        const subjectsList = [...data.subjects];
        const subjectsSubset = (subjectsList.length) > 30 ? subjectsList.slice(0, 30) : subjectsList;
        
        subjects = subjectsSubset.join("', '");
      }

      if (data.description?.value) {
        description = data.description.value;
      } else if (data.description) {
        description = data.description;
      }

      if (data.covers?.length > 0) {
        coverId = data.covers[0];
      }

      const bookData = {
        author: authorData.name,
        title: data.title,
        coverImg: coverId
          ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
          : missingCover,
        description: description,
        subjects
      };
      dispatch(bookpageActions.showPageData(bookData));
      dispatch(bookpageActions.changeLoadingStatus(false));
    } catch (error) {
      console.log(error);
      dispatch(bookpageActions.changeLoadingStatus(false));
    }
  };
};
