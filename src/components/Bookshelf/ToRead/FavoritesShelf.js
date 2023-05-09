import { useSelector } from "react-redux";
import classes from "../../BookSearch/BookResults/BookResults.module.css";
import BookItemAdded from "../../BookItem/BookItemAdded";
import FavoriteButtons from "./FavoriteButtons";
import Container from "../../Container/Container";


export default function Favorites() {
  const bookItems = useSelector((state) => state.bookshelf.books);

  const favoriteBooks = bookItems.filter((book) => book.isFavorite);

  return (
    <Container>
      <h2>Books to read:</h2>
      <div className={classes["book-container"]}>
        {!favoriteBooks.length && <h3>Bookshelf is empty</h3>}
        {favoriteBooks.map((book) => (
          <BookItemAdded
            key={book.id}
            id={book.id}
            author={book.author}
            title={book.title}
            coverImg={book.coverImg}
          >
            <FavoriteButtons id={book.id} />
          </BookItemAdded>
        ))}
      </div>
    </Container>
  );
}
