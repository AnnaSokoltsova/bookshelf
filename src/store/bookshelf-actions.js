import { bookshelfActions } from "./bookshelf-slice";
import { uiActions } from "./ui-slice";
import { db } from "../config/firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { MESSAGES } from "../text";

export const sendBookshelfData = (id, author, title, coverImg, userId) => {
  return (dispatch) => {
    const sendBook = async () => {
      dispatch(uiActions.showNotification(""));
      try {
        const addedBook = {
          id,
          author,
          title,
          coverImg,
          comments: [],
          isFavorite: true,
          inProgressStatus: false,
          completedStatus: false,
        };

        const userCollectionRef = collection(db, `${userId}`);
        const bookRef = doc(userCollectionRef, id);
        await setDoc(bookRef, addedBook);
      } catch (error) {
        dispatch(uiActions.showNotification(MESSAGES.firestoreErrors.errorWhenAddingBook));
      }
    };
    sendBook();
  };
};

export const fetchBookshelfData = (userId) => {
  return (dispatch) => {
    const getBooks = async () => {
      try {
        const userCollectionRef = collection(db, `${userId}`);
        const data = await getDocs(userCollectionRef);

        const bookshelfData = data.docs.map((doc) => ({ ...doc.data() }));
        dispatch(bookshelfActions.replaceBookshelf(bookshelfData || []));
      } catch (error) {
        dispatch(uiActions.showNotification(MESSAGES.firestoreErrors.fetchDataFailed));
      }
    };
    getBooks();
  };
};

export const updateBookStatus = (id, userId, bookStatuses) => {
  return (dispatch) => {
    const updateBook = async () => {
      try {
        const userCollectionRef = collection(db, `${userId}`);
        const bookRef = doc(userCollectionRef, id);
        await updateDoc(bookRef, bookStatuses);
      } catch (error) {
        dispatch(uiActions.showNotification(MESSAGES.firestoreErrors.updateStatusFailed));
      }
    };
    updateBook();
  };
};

export const removeBook = (id, userId) => {
  return (dispatch) => {
    const deleteBook = async () => {
      try {
        const userCollectionRef = collection(db, `${userId}`);
        const bookRef = doc(userCollectionRef, id);
        await deleteDoc(bookRef);
      } catch (error) {
        dispatch(uiActions.showNotification(MESSAGES.firestoreErrors.removeBookFailed));
      }
    };
    deleteBook();
  };
};

export const addComment = (id, userId, comments) => {
  return (dispatch) => {
    const updateBook = async () => {
      try {
        const userCollectionRef = collection(db, `${userId}`);
        const bookRef = doc(userCollectionRef, id);
        await updateDoc(bookRef, comments);
      } catch (error) {
        dispatch(
          uiActions.showNotification(MESSAGES.firestoreErrors.addOrDeleteCommentFailed)
        );
      }
    };
    updateBook();
  };
};
