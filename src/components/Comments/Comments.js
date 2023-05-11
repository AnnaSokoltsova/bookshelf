import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import classes from "./Comments.module.css";
import { addComment } from "../../store/bookshelf-actions";
import { useAuth } from "../../context/AuthContext";

export default function Comments() {
  const { pageid } = useParams();
  const dispatch = useDispatch();
  const bookItems = useSelector((state) => state.bookshelf.books);
  const reviewdBook = bookItems.find((book) => book.id === pageid);
  const { currentUser } = useAuth();
  const userId = currentUser.uid;

  useEffect(() => {
    const userComments = {
      comments: reviewdBook.comments,
    };
    dispatch(addComment(pageid, userId, userComments));
  }, [reviewdBook.comments, dispatch, pageid, userId]);

  let date = new Date().toLocaleDateString();


  return (
    <div className={classes["single-comments_container"]}>
      {reviewdBook.comments.map((comment) => (
        <p key={uuidv4()} className={classes["single-comment"]}>
          {comment}
          <p className={classes["single-comment__date"]}>{date}</p>
        </p>
      ))}
    </div>
  );
}
