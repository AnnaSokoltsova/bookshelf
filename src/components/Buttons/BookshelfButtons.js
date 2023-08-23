import classes from "./Buttons.module.css"


export default function BookshelfButtons({ handleStop, handleProceed, type }) {
  return (
    <div className={classes["single-book__btns"]}>
      <button type="button" className={classes["single-book__btn-close"]} onClick={handleStop}>
        <span className={classes["single-book__icon-cross"]}></span>
      </button>
      <button className={classes["single-book__btn"]} onClick={handleProceed}>
        <svg>
          <rect x="0" y="0" fill="none" width="100%" height="100%" />
        </svg>
        {type === "toRead" ? "Start reading" : "Complete"}
      </button>
    </div>
  );
}
