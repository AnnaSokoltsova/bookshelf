import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./Comments.module.css";
import { addComment } from "../../store/bookshelf-actions";
import { useAuth } from "../../context/AuthContext";
import Comment from "./Comment";

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

  return (
    <div className={classes["single-comments_container"]}>
      {reviewdBook.comments.map((comment) => {
        return (
          <Comment
            key={comment.commentId}
            id={comment.commentId}
            comment={comment.text}
            pageid={pageid}
          />
        );
      })}
    </div>
  );
}
