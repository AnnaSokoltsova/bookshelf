
import { useAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { bookshelfActions } from "../../store/bookshelf-slice";
import { useNavigate } from "react-router-dom";
import { sendBookshelfData } from "../../store/bookshelf-actions";
import AddBookButton from "../../components/Buttons/BookSearchButton";
import { ROUTES_DATA } from "../../routes";


export default function BookSearchButtonsContainer({author, id, title, coverImg, setBookAdded}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleAddBook = () => {
    if (!currentUser) {
      navigate(ROUTES_DATA.AUTH.SIGN_IN.url);
      return;
    }

    dispatch(
      bookshelfActions.addBookToShelf({
        id,
        author,
        title,
        coverImg,
      })
    );

    setBookAdded(true);

    const userId = currentUser.uid;
    dispatch(sendBookshelfData(id, author, title, coverImg, userId));
  };

  return (
    <AddBookButton handleAddBook={handleAddBook} />
  )
}
