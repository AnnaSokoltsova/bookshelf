import classes from "../../BookItem/BookItem.module.css";
import { useDispatch } from "react-redux";
import { bookshelfActions } from "../../../store/bookshelf-slice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function BookResultButton({ id, author, title, coverImg }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const handleClick = () => {
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
    navigate("/bookshelf");
  };

  return (
    <button className={classes["single-book__btn"]} onClick={handleClick}>
      <svg>
        <rect x="0" y="0" fill="none" width="100%" height="100%" />
      </svg>
      To the bookshelf
    </button>
  );
}
