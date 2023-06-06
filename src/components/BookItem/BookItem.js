import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { bookshelfActions } from "../../store/bookshelf-slice";
import { useNavigate } from "react-router-dom";
import { sendBookshelfData } from "../../store/bookshelf-actions";
import missingCover from "../../images/missingcover.png";
import { Bookmark } from "../Badges/Bookmark";

import AddBookButton from "./AddBookButton";
import classes from "./BookItem.module.css";

export default function BookItem({ id, author, title, coverImg }) {
  const [bookAdded, setBookAdded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const replaceImageOnError = (event) => {
    event.currentTarget.src = missingCover;
  };

  const handleAddBook = () => {
    if (!currentUser) {
      navigate("/signin");
      return;
    }

    dispatch(
      bookshelfActions.addBookToShelf({
        id,
        author,
        title,
        coverImg,
      })
    );

    setBookAdded(true);

    const userId = currentUser.uid;
    dispatch(sendBookshelfData(id, author, title, coverImg, userId));
  };

  return (
    <article className={classes["single-book"]}>
      <div className={classes["single-book__image"]}>
        <Link to={`/${id}`}>
          <img src={coverImg} alt="cover" onError={replaceImageOnError} />
        </Link>
      </div>
      <div className={classes["single-book__content"]}>
        <div className={classes["single-book__text-container"]}>
          <div className={classes["single-book__text"]}>
            <span>{author}</span>
          </div>
          <div className={classes["single-book__text"]}>
            <Link to={`/${id}`} className={classes["single-book__link"]}>
              {title}
            </Link>
          </div>
        </div>
        {bookAdded && <Bookmark />}
        <AddBookButton
          author={author}
          id={id}
          bookshelf
          title={title}
          coverImg={coverImg}
          handleAddBook={handleAddBook}
        />
      </div>
    </article>
  );
}
