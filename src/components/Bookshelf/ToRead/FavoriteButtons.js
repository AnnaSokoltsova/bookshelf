import classes from "../../BookItem/BookItem.module.css";
import { useDispatch } from "react-redux";
import { bookshelfActions } from "../../../store/bookshelf-slice";
import { useNavigate } from "react-router-dom";

export default function FavoriteButtons({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = () => {
    console.log(id);
    dispatch(bookshelfActions.removeFromBookShelf(id));
  };

  const handleClick = () => {
    dispatch(bookshelfActions.startReading(id));
    navigate("/bookshelf/inprogress");
  };

  return (
    <div className={classes["single-book__btns"]}>
      <button className={classes["single-book__btn"]} onClick={handleRemove}>
        <svg>
          <rect x="0" y="0" fill="none" width="100%" height="100%" />
        </svg>
        Remove
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
