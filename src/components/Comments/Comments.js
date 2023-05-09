import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Comments() {
  const { pageid } = useParams();
  const bookItems = useSelector((state) => state.bookshelf.books);
  const reviewdBook = bookItems.find((book) => book.id === pageid);
  console.log(reviewdBook);
  return (
    <div>
      {reviewdBook.comments.map((comment) => (
        <p key={uuidv4()}>{comment}</p>
      ))}
    </div>
  );
}
