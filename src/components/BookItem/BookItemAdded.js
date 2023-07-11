import classes from "./BookItem.module.css";
import { Link } from "react-router-dom";
import missingCover from "../../images/missingcover.png";
import { ROUTES_DATA } from "../../routes";

export default function BookItemAdded({
  children,
  id,
  author,
  title,
  coverImg,
}) {
  const replaceImageOnError = (event) => {
    event.currentTarget.src = missingCover;
  };
  
  return (
    <article className={classes["single-book"]}>
      <div className={classes["single-book__image"]}>
        <Link to={`${ROUTES_DATA.BOOKSHELF.url}/${id}`}>
          <img src={coverImg} alt="cover" onError={replaceImageOnError} />
        </Link>
      </div>
      <div className={classes["single-book__content"]}>
        <div className={classes["single-book__text-container"]}>
          <div className={classes["single-book__text"]}>
            <span>{author}</span>
          </div>
          <div className={classes["single-book__text"]}>
            <Link
              to={`${ROUTES_DATA.BOOKSHELF.url}/${id}`}
              className={classes["single-book__link"]}
            >
              {title}
            </Link>
          </div>
        </div>
        {children}
      </div>
    </article>
  );
}
