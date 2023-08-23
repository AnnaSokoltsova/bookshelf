import { Link } from "react-router-dom";
import { Bookmark } from "../Badges/Bookmark";
import { ROUTES_DATA } from "../../routes";

import classes from "./BookItem.module.css";

export default function BookItem({
  id,
  author,
  title,
  coverImg,
  bookAdded,
  type,
  replaceImageOnError,
  children,
}) {
  return (
    <article className={classes["single-book"]}>
      <div className={classes["single-book__image"]}>
        <Link
          to={
            type === "search" ? `/${id}` : `${ROUTES_DATA.BOOKSHELF.url}/${id}`
          }
        >
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
              to={
                type === "search"
                  ? `/${id}`
                  : `${ROUTES_DATA.BOOKSHELF.url}/${id}`
              }
              className={classes["single-book__link"]}
            >
              {title}
            </Link>
          </div>
        </div>
        {type === "search" && bookAdded && <Bookmark />}
        {children}
      </div>
    </article>
  );
}
