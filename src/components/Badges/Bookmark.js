import React from "react";
import { Avatar } from "@mui/material";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

export const Bookmark = () => (
  <Avatar sx={{ bgcolor: "#469a52", position: "absolute", top: 0, right: 0 }}>
    <BookmarkAddedIcon />
  </Avatar>
);

