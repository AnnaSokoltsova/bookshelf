
import classes from "./BookItem.module.css";
import { Link } from "react-router-dom";
import missingCover from "../../images/missingcover.png";

export default function BookItemAdded({ children, id, author, title, coverImg }) {

  const replaceImageOnError = (event) => {
    event.currentTarget.src = missingCover;
  };
  console.log(id);
  return (
    <article className={classes["single-book"]}>
      <div className={classes["single-book__image"]}>
        <img src={coverImg} alt="cover" onError={replaceImageOnError}/>
      </div>
      <div className={classes["single-book__content"]}>
        <div className={classes["single-book__text-container"]}>
          <div className={classes["single-book__text"]}>
            <span>Author: {author.join(", ")}</span>
          </div>
          <div className={classes["single-book__text"]}>
            <Link to={`/bookshelf/${id}`}><span>Title: {title}</span></Link>
          </div>
        </div>
        {children}
      </div>
    </article>
  );
}