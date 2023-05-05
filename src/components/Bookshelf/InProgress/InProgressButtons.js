import React from "react";
import classes from "../../BookItem/BookItem.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookshelfActions } from "../../../store/bookshelf-slice";
import { useAuth } from "../../../context/AuthContext";
import { updateBookStatus } from "../../../store/bookshelf-actions";

export default function InProgressButtons({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const userId = currentUser.uid;

  const handleRemove = () => {
    dispatch(bookshelfActions.stopReading(id));
    const bookStatuses = {
      inProgressStatus : false,
      isFavorite : true
    }
    dispatch(updateBookStatus(id, userId, bookStatuses));
  };

  const handleClick = () => {
    dispatch(bookshelfActions.finishTheBook(id));
    navigate("/bookshelf/completed");

    const bookStatuses = {
      inProgressStatus : false,
      completedStatus : true
    }
    dispatch(updateBookStatus(id, userId, bookStatuses));
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
        Complete
      </button>
    </div>
  );
}
