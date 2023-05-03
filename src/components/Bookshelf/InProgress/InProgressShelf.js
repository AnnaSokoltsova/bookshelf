import { useSelector } from "react-redux";
import classes from "../../BookSearch/BookResults/BookResults.module.css";
import BookItem from "../../BookItem/BookItem";
import InProgressButtons from "./InProgressButtons";
import Container from "../../Container/Container";

export default function InProgress() {
  const bookItems = useSelector((state) => state.bookshelf.books);

  const booksInProgress = bookItems.filter((book) => book.inProgressStatus);

  return (
    <Container>
      <h2>In progress:</h2>
      <div className={classes["book-container"]}>
        {!booksInProgress.length && (
          <h3>You are not reading books currently </h3>
        )}
        {booksInProgress.map((book) => (
          <BookItem
            key={book.id}
            author={book.author}
            title={book.title}
            coverImg={book.coverImg}
          >
            <InProgressButtons id={book.id} />
          </BookItem>
        ))}
      </div>
    </Container>
  );
}
