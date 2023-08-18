import { useSelector } from "react-redux";
import classes from "./BookContainer.module.css";
import ErrorAlert from "../../components/Badges/ErrorAlert";
import BookItemContainer from '../BookItemContainer/BookItemContainer'

export default function BookSearchResults({type}) {
  const { bookResults, isLoading, searchTitle } = useSelector(
    (state) => state.bookSearch
  );

  return (
    <div>
      <p>{searchTitle}</p>
      {isLoading && <p>Loading...</p>}

      {!isLoading && (
        <div className={classes["book-container"]}>
          {bookResults.map((book) => (
            <BookItemContainer
              key={book.id}
              id={book.id}
              author={book.author}
              title={book.title}
              coverImg={book.coverImg}
              type={type}
            />
          ))}
          <ErrorAlert />
        </div>
      )}
    </div>
  );
}
