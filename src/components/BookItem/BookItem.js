import React from "react";
import classes from "./BookItem.module.css";
import { Link } from "react-router-dom";
import missingCover from "../../images/missingcover.png";

export default function BookItem({ children, id, author, title, coverImg }) {

  const replaceImageOnError = (event) => {
    event.currentTarget.src = missingCover;
  };

  return (
    <article className={classes["single-book"]}>
      <div className={classes["single-book__image"]}>
      <Link to={`/${id}`}><img src={coverImg} alt="cover" onError={replaceImageOnError}/></Link>
      </div>
      <div className={classes["single-book__content"]}>
        <div className={classes["single-book__text-container"]}>
          <div className={classes["single-book__text"]}>
            <span>Author: {author.join(", ")}</span>
          </div>
          <div className={classes["single-book__text"]}>
            <Link to={`/${id}`}><span>Title: {title}</span></Link>
          </div>
        </div>
        {children}
      </div>
    </article>
  );
}
