import { useSelector } from "react-redux";
import classes from "../../BookSearch/BookResults/BookResults.module.css";
import BookItemAdded from "../../BookItem/BookItemAdded";
import InProgressButtons from "./InProgressButtons";
import Container from "../../Container/Container";
import ErrorAlert from "../../Badges/ErrorAlert";

export default function InProgress() {
  const bookItems = useSelector((state) => state.bookshelf.books);

  const booksInProgress = bookItems.filter((book) => book.inProgressStatus);

  return (
    <Container>
      <h2>In progress:</h2>
      {!booksInProgress.length && (
        <h3 className={classes["empty-text"]}>
          You are not reading books currently{" "}
        </h3>
      )}
      <div className={classes["book-container"]}>
        {booksInProgress.map((book) => (
          <BookItemAdded
            key={book.id}
            id={book.id}
            author={book.author}
            title={book.title}
            coverImg={book.coverImg}
          >
            <InProgressButtons id={book.id} />
          </BookItemAdded>
        ))}
      </div>
      <ErrorAlert/>
    </Container>
  );
}
