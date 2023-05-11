import { bookshelfActions } from "./bookshelf-slice";
import { uiActions } from "./ui-slice";
import { db } from "../config/firebase";
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

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
        const userCollectionRef = collection(db, `books ${userId}`);
        const bookRef = doc(userCollectionRef, id);
        await setDoc(bookRef, addedBook);
        console.log("book added");
        dispatch(uiActions.showNotification("Added to the bookshelf"));
      } catch (error) {
        console.log(error.message);
        dispatch(
          uiActions.showNotification("Error when adding a book:", error)
        );
      }
    };
    sendBook();
  };
};

export const fetchBookshelfData = (userId) => {
  return (dispatch) => {
    const getBooks = async () => {
      try {
        const userCollectionRef = collection(db, `books ${userId}`);
        const data = await getDocs(userCollectionRef);
        console.log(data);
        const bookshelfData = data.docs.map((doc) => ({...doc.data()}))
        dispatch(bookshelfActions.replaceBookshelf(bookshelfData || []));
      } catch (error) {
        console.log(error.message);
        dispatch(
          uiActions.showNotification('Fetching bookshelf data failed!')
        );
      }
    };
    getBooks();
  };
};

export const updateBookStatus = (id, userId, bookStatuses) => {
  return (dispatch) => {
    const updateBook = async () => {
      try {
        const userCollectionRef = collection(db, `books ${userId}`);
        const bookRef = doc(userCollectionRef, id);
        await updateDoc(bookRef, bookStatuses);
        console.log('book updated');
      } catch (error) {
        console.log(error.message);
        dispatch(
          uiActions.showNotification('Updating book status failed')
        );
      }
    };
    updateBook();
  };
}

export const removeBook = (id, userId) => {
  return (dispatch) => {
    const deleteBook = async () => {
      try {
        const userCollectionRef = collection(db, `books ${userId}`);
        const bookRef = doc(userCollectionRef, id);
        await deleteDoc(bookRef);
        console.log('book deleted');
      } catch (error) {
        console.log(error.message);
        dispatch(
          uiActions.showNotification('Deleting book failed')
        );
      }
    };
    deleteBook();
  };
}

export const addComment = (id, userId, comments) => {
  return (dispatch) => {
    const updateBook = async () => {
      try {
        const userCollectionRef = collection(db, `books ${userId}`);
        const bookRef = doc(userCollectionRef, id);
        await updateDoc(bookRef, comments);
        console.log('comments sent to firebase');
      } catch (error) {
        console.log(error.message);
        dispatch(
          uiActions.showNotification('Adding comment failed')
        );
      }
    };
    updateBook();
  };
}