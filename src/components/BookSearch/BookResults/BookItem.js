import classes from "./BookItem.module.css";
import { useDispatch } from 'react-redux';
import { toReadActions } from "../../../store/book-shelf-to-read";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";


export default function BookItem({ id, author, title, coverImg }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const { currentUser } = useAuth();

  const handleClick = () => {
    if (!currentUser) {
      navigate('/signin');
      return;
    }

    dispatch(toReadActions.addBookToShelf({
      id,
      author,
      title,
      coverImg
    }))
    navigate('/bookshelf');
  }

  return (
    <article className={classes["single-book"]}>
      <div className={classes["single-book__image"]}>
        <img src={coverImg} alt="cover" />
      </div>
      <div className={classes["single-book__content"]}>
        <div className={classes["single-book__text-container"]}>
          <div className={classes["single-book__text"]}>
            <span>Author: </span>
            <span>{author.join(", ")}</span>
          </div>
          <div className={classes["single-book__text"]}>
            <span>Title: </span>
            <span>{title}</span>
          </div>
        </div>
        <button className={classes["single-book__btn"]} onClick={handleClick}>
          <svg>
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
          To the bookshelf
        </button>
      </div>
    </article>
  );
}
