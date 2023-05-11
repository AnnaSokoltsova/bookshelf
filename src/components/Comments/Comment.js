import React from "react";
import classes from "./Comments.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { bookshelfActions } from "../../store/bookshelf-slice";
import { useDispatch } from "react-redux";

export default function Comment({ id, comment, pageid}) {
  let date = new Date().toLocaleDateString();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(bookshelfActions.removeComment({id, pageid}));
  }

  return (
    <div className={classes["single-comment"]}>
      <div className={classes["single-comment__text"]}>{comment}</div>
      <div className={classes["single-comment__date"]}>{date}</div>
      <IconButton
        aria-label="delete"
        size="small"
        sx={{
          position: "absolute",
          bottom: 2,
          right: 2,
        }}
        onClick={handleDelete}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
}
