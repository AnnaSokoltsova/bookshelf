import React from "react";
import classes from "./BookItem.module.css";

export default function BookItem({ children, author, title, coverImg }) {
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
        {children}
      </div>
    </article>
  );
}
