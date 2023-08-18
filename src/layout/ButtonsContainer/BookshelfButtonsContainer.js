
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookshelfActions } from "../../store/bookshelf-slice";
import { useAuth } from "../../context/AuthContext";
import { updateBookStatus } from "../../store/bookshelf-actions";
import { removeBook } from "../../store/bookshelf-actions";
import { ROUTES_DATA } from "../../routes";
import BookshelfButtons from '../../components/Buttons/BookshelfButtons'


export default function BookshelfButtonsContainer({id, type}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const userId = currentUser.uid;

  const handleCeaseProgress = () => {
    dispatch(bookshelfActions.stopReading(id));
    const bookStatuses = {
      inProgressStatus: false,
      isFavorite: true,
    };
    dispatch(updateBookStatus(id, userId, bookStatuses));
  };

  const handleComplete = () => {
    dispatch(bookshelfActions.finishTheBook(id));
    navigate(ROUTES_DATA.BOOKSHELF.COMPLETED.url);

    const bookStatuses = {
      inProgressStatus: false,
      completedStatus: true,
    };
    dispatch(updateBookStatus(id, userId, bookStatuses));
  };

  const handleRemove = () => {
    dispatch(bookshelfActions.removeFromBookShelf(id));
    dispatch(removeBook(id, userId));
  };

  const handleStartReading = () => {
    dispatch(bookshelfActions.startReading(id));
    navigate(ROUTES_DATA.BOOKSHELF.IN_PROGRESS.url);

    const bookStatuses = {
      inProgressStatus: true,
      isFavorite: false,
    };
    dispatch(updateBookStatus(id, userId, bookStatuses));
  };

  const props = {
    ...(type === "toRead" && {
      handleStop: handleRemove,
      handleProceed: handleStartReading,
    }),
    ...(type === "inProgress" && {
      handleStop: handleCeaseProgress,
      handleProceed: handleComplete,
    }),
  };

  return (
    <BookshelfButtons {...props} type={type}/>
  )
}
