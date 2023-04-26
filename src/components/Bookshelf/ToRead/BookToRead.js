import classes from "../../BookSearch/BookResults/BookItem.module.css";
import { useDispatch } from 'react-redux';
import { toReadActions } from "../../../store/book-shelf-to-read";

export default function BookToRead({ id, author, title, coverImg }) {
  const dispatch = useDispatch();
   
  const handleRemove = () => {
    console.log(id)
    dispatch(toReadActions.removeFromBookShelf(id))
  }

  // const handleClick = () => {
  //   dispatch(toReadActions.addBookToShelf({
  //     author,
  //     title,
  //     coverImg
  //   }))
  // }
  
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
        <div className={classes['single-book__btns']}>
        <button className={classes["single-book__btn"]} onClick={handleRemove}>
          <svg>
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
          Remove
        </button>

        <button className={classes["single-book__btn"]} >
          <svg>
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
          Start reading
        </button>
        </div>
      </div>
    </article>
  );
}
