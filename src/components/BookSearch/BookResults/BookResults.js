import { useSelector } from "react-redux";

import BookItem from "../../BookItem/BookItem";
import BookResultButton from "./BookResultButton";
import classes from "./BookResults.module.css";

export default function BookResults() {
  const bookResults = useSelector((state) => state.bookSearch.bookResults);
  const loadingStatus = useSelector((state) => state.bookSearch.isLoading);
  const searchTitle = useSelector((state) => state.bookSearch.searchTitle);

  return (
    <div>
      <p>{searchTitle}</p>
      {loadingStatus && <p>Loading...</p>}
      {!loadingStatus && (
        <div className={classes["book-container"]}>
          {bookResults.map((book) => (
            <BookItem
              key={book.id}
              id={book.id}
              author={book.author}
              title={book.title}
              coverImg={book.coverImg}
            >
              <BookResultButton
                author={book.author}
                id={book.id}
                title={book.title}
                coverImg={book.coverImg}
              />
            </BookItem>
          ))}
        </div>
      )}
    </div>
  );
}
