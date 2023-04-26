import { useSelector } from 'react-redux';
import classes from '../../BookSearch/BookResults/BookResults.module.css';
import BookToRead from './BookToRead';
import Container from '../../Container/Container';

export default function ToRead() {
  const bookItems = useSelector((state) => state.toRead.booksToRead);
  return (
    <Container>
    <h2>Books to be read:</h2>
    <div className={classes["book-container"]}>
          {bookItems.map((book) => (
            <BookToRead
              key={book.id}
              id={book.id}
              author={book.author}
              title={book.title}
              coverImg={book.coverImg}
            />
          ))}
        </div>
    </Container>
  )
}
