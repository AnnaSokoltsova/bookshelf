import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { bookSearchActions } from "../../../store/book-search-slice";
import classes from "./SearchForm.module.css";
import { fetchBooksData } from "../../../store/fetchFromOpenLibrary";

let isMounted = false;

function SearchForm(props) {
  const [searchText, setSearchText] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  

  // useEffect(() => searchText.current.focus(), []);
  useEffect(() => {
    if (isMounted) {
      if (searchText !== "") {
        dispatch(fetchBooksData(searchText));
      }
    } else {
      
      dispatch(fetchBooksData("The Hobbit"));
      isMounted = true;
    }
  }, [searchText, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempSearchTerm = searchInput.trim();
    if (tempSearchTerm.replace(/[^\w\s]/gi, "").length === 0) {
      dispatch(bookSearchActions.showBookResults([]));
      dispatch(
        bookSearchActions.setSearchTitle("Please enter the name of a book :)")
      );
      setSearchText(tempSearchTerm);
    } else {
      setSearchText(searchInput);
    }
  };

  return (
    <div className={classes["search-container"]}>
      <p className={classes["search-title"]}>
        Find your book and add it to the bookshelf
      </p>
      <form className={classes["search-form"]} onSubmit={handleSubmit}>
        <input
          type="text"
          className={classes["search-form__input"]}
          placeholder="Search books or authors"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          type="submit"
          className={classes["search-form__btn"]}
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
