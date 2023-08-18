import { useSelector } from "react-redux";
import classes from "./BookContainer.module.css";
import Container from "../../components/Container/Container";
import ErrorAlert from "../../components/Badges/ErrorAlert";
import BookItemContainer from "../BookItemContainer/BookItemContainer";

export default function BookshelfContainer({ type }) {
  const { books } = useSelector((state) => state.bookshelf);

  let bookItems = [];

  switch (type) {
    case "toRead":
      bookItems = books.filter((book) => book.isFavorite);
      break;
    case "inProgress":
      bookItems = books.filter((book) => book.inProgressStatus);
      break;
    default:
      bookItems = books.filter((book) => book.completedStatus);
      break;
  }

  return (
    <Container>
      <h2>
        {type === "toRead"
          ? "Books to read:"
          : type === "inProgress"
          ? "In progress:"
          : "Completed:"}
      </h2>
      {!bookItems.length && (
        <h3 className={classes["empty-text"]}>Bookshelf is empty</h3>
      )}
      <div className={classes["book-container"]}>
        {bookItems.map((book) => (
          <BookItemContainer
            key={book.id}
            id={book.id}
            author={book.author}
            title={book.title}
            coverImg={book.coverImg}
            type={type}
          />
        ))}
      </div>
      <ErrorAlert />
    </Container>
  );
}
