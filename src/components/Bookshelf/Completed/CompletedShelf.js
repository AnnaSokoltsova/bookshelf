import { useSelector } from "react-redux";
import classes from "../../BookSearch/BookResults/BookResults.module.css";
import BookItem from "../../BookItem/BookItem";
import Container from "../../Container/Container";

export default function CompletedShelf() {
  const bookItems = useSelector((state) => state.bookshelf.books);

  const completedBooks = bookItems.filter((book) => book.completedStatus);

  return (
    <Container>
      <h2>In progress:</h2>
      <div className={classes["book-container"]}>
        {!completedBooks.length && (
          <h3>You have not finished reading a book yet </h3>
        )}
        {completedBooks.map((book) => (
          <BookItem
            key={book.id}
            author={book.author}
            title={book.title}
            coverImg={book.coverImg}
          ></BookItem>
        ))}
      </div>
    </Container>
  );
}