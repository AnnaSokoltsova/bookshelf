import classes from "./Buttons.module.css"

export default function AddBookButton({ handleAddBook }) {
  return (
    <button className={classes["single-book__btn"]} onClick={handleAddBook}>
      <svg>
        <rect x="0" y="0" fill="none" width="100%" height="100%" />
      </svg>
      Add the book
    </button>
  );
}
