import { useState } from "react";

import missingCover from "../../images/missingcover.png";

import BookSearchButtonsContainer from "../../layout/ButtonsContainer/BookSearchButtonsContainer";

import BookshelfButtonsContainer from "../ButtonsContainer/BookshelfButtonsContainer";
import BookItem from "../../components/BookItem/BookItem";

export default function BookItemContainer({
  id,
  author,
  title,
  coverImg,
  type,
}) {
  const [bookAdded, setBookAdded] = useState(false);

  const replaceImageOnError = (event) => {
    event.currentTarget.src = missingCover;
  };

  return (
    <BookItem
      id={id}
      author={author}
      title={title}
      coverImg={coverImg}
      type={type}
      bookAdded={bookAdded}
      replaceImageOnError={replaceImageOnError}
    >
      {type === "search" ? (
        <BookSearchButtonsContainer
          author={author}
          id={id}
          title={title}
          coverImg={coverImg}
          setBookAdded={setBookAdded}
        />
      ) : type !== "completed" ? (
        <BookshelfButtonsContainer id={id} type={type} />
      ) : (
        ""
      )}
    </BookItem>
  );
}
