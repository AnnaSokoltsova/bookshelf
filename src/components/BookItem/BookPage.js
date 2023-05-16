import { useSelector } from "react-redux";
import classes from "./BookPage.module.css";
import { useParams } from "react-router-dom";
import Container from "../Container/Container";
import { useEffect, useState } from "react";
import { fetchWorksData } from "../../store/fetchFromOpenLibrary";
import { useDispatch } from "react-redux";
import missingCover from "../../images/missingcover.png";

export default function BookPage({ children }) {
  const { pageid } = useParams();
  const dispatch = useDispatch();
  const bookPage = useSelector((state) => state.bookpage.bookpage);
  const loadingStatus = useSelector((state) => state.bookpage.isLoading);
  const [bookDescrStatus, setBookDescrStatus] = useState(true);

  const { author, coverImg, title, description, subjects } = bookPage;

  useEffect(() => {
    if (
      !loadingStatus &&
      (description.length === 0 || description?.includes("Contains:"))
    ) {
      setBookDescrStatus(false);
    }
  }, [description, loadingStatus]);

  useEffect(() => {
    dispatch(fetchWorksData(pageid));
  }, [dispatch, pageid]);

  const replaceImageOnError = (event) => {
    event.currentTarget.src = missingCover;
  };

  return (
    <Container>
      {loadingStatus && <p>Loading...</p>}
      {!loadingStatus && (
        <div className={classes["book-page"]}>
          <div className={classes["book-page__image-container"]}>
            <img
              src={coverImg}
              alt="cover"
              className={classes["book-page__image"]}
              onError={replaceImageOnError}
            />
          </div>
          <div className={classes["book-page__content"]}>
            <div className={classes["book-page__text-container"]}>
              <div className={classes["book-page__text"]}>
                <span>Author: </span>
                <span>{author}</span>
              </div>
              <div className={classes["book-page__text"]}>
                <span>Title: </span>
                <span>{title}</span>
              </div>
              {bookDescrStatus && (
                <div className={classes["book-page__text"]}>
                  <span>Description: </span>
                  <span className={classes["book-page__descr"]}>
                    {description}
                  </span>
                </div>
              )}
              {subjects && <div className={classes["book-page__text"]}>
                <span>Subjects: </span>
                <span>'{subjects}'</span>
              </div>}
            </div>
          </div>
        </div>
      )}
      {children}
    </Container>
  );
}
