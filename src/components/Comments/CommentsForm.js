import { useState, useId } from "react";
import { useDispatch } from "react-redux";
import { bookshelfActions } from "../../store/bookshelf-slice";
import classes from "./Comments.module.css";
import { useParams } from "react-router-dom";

export default function CommentsForm() {
  const [labelText, setLabelText] = useState("Leave your comments:");
  const [textAreaComment, setTextAreaComment] = useState("");
  const dispatch = useDispatch();
  const postTextAreaId = useId();
  const { pageid } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    let userComment = textAreaComment.trim();
    if (userComment.replace(/[^\w\s]/gi, "").length === 0) {
      setLabelText('Your comment can\'t be empty');
    } else {
      dispatch(bookshelfActions.addComment({id: pageid, comment: userComment}));
      setLabelText('Leave your comments:')
      setTextAreaComment('');
    }
  };

  return (
    <div className={classes["comments-container"]}>
      <form className={classes["comments-form"]} onSubmit={handleSubmit}>
        <label htmlFor={postTextAreaId}>
          {labelText}
          <textarea
            id={postTextAreaId}
            name="postComment"
            value={textAreaComment}
            onChange={(e) => setTextAreaComment(e.target.value)}
            rows={4}
            cols={40}
          />
        </label>
        <button
          type="submit"
          className={classes["comments-form__btn"]}
          onClick={handleSubmit}
        >
          Post
        </button>
      </form>
    </div>
  );
}
