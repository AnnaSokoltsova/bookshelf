import { useSelector } from "react-redux";

import BookItem from "./BookItem";
import missingCover from "../../../images/missingcover.png";
import classes from "./BookResults.module.css";

export default function BookResults() {
  const bookResults = useSelector((state) => state.bookSearch.bookResults);
  const loadingStatus = useSelector((state) => state.bookSearch.isLoading);
  const searchTitle = useSelector((state) => state.bookSearch.searchTitle);

  const booksWithCovers = bookResults.map((bookInstance) => {
    return {
      ...bookInstance,
      cover_img: bookInstance.cover_id
        ? `https://covers.openlibrary.org/b/id/${bookInstance.cover_id}-L.jpg`
        : bookInstance.cover_img
        ? bookInstance.cover_img
        : missingCover,
    };
  });

  return (
    <div>
      <p>{searchTitle}</p>
      {loadingStatus && <p>Loading...</p>}
      {!loadingStatus && (
        <div className={classes["book-container"]}>
          {booksWithCovers.map((book) => (
            <BookItem
              key={book.id}
              id={book.id}
              author={book.author}
              title={book.title}
              coverImg={book.cover_img}
            />
          ))}
        </div>
      )}
    </div>
  );
}
