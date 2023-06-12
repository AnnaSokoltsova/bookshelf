import classes from "../../BookItem/BookItem.module.css";
import { useDispatch } from "react-redux";
import { bookshelfActions } from "../../../store/bookshelf-slice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { updateBookStatus } from "../../../store/bookshelf-actions";
import { removeBook } from "../../../store/bookshelf-actions";
import { ROUTES_DATA } from "../../../routes";

export default function ToReadButtons({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const userId = currentUser.uid;

  const handleRemove = () => {
    console.log(id);
    dispatch(bookshelfActions.removeFromBookShelf(id));

    dispatch(removeBook(id, userId));
  };

  const handleClick = () => {
    dispatch(bookshelfActions.startReading(id));
    navigate(ROUTES_DATA.BOOKSHELF.IN_PROGRESS.url);

    const bookStatuses = {
      inProgressStatus: true,
      isFavorite: false,
    };
    dispatch(updateBookStatus(id, userId, bookStatuses));
  };

  return (
    <div className={classes["single-book__btns"]}>
      <button type="button" className={classes["single-book__btn-close"]} onClick={handleRemove}>
        <span className={classes["single-book__icon-cross"]}></span>
      </button>
      <button className={classes["single-book__btn"]} onClick={handleClick}>
        <svg>
          <rect x="0" y="0" fill="none" width="100%" height="100%" />
        </svg>
        Start reading
      </button>
    </div>
  );
}
