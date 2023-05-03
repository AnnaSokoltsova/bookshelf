import React from "react";
import classes from "../../BookItem/BookItem.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookshelfActions } from "../../../store/bookshelf-slice";

export default function InProgressButtons({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = () => {
    console.log(id);
    dispatch(bookshelfActions.stopReading(id));
  };

  const handleClick = () => {
    dispatch(bookshelfActions.finishTheBook(id));
    navigate("/bookshelf/completed");
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
