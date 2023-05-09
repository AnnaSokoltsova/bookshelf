import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookSearch from "./components/BookSearch/BookSearch";
import BookPage from "./components/BookItem/BookPage";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import BookshelfLayout from "./components/SharedLayout/BookshelfLayout";
import Profile from "./components/Profile/Profile";
import InProgress from "./components/Bookshelf/InProgress/InProgressShelf";
import Completed from "./components/Bookshelf/Completed/CompletedShelf";
import Favorites from "./components/Bookshelf/ToRead/FavoritesShelf";
import SignIn from "./components/Profile/SignIn";
import SignUp from "./components/Profile/SignUp";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import CommentsForm from "./components/Comments/CommentsForm";
import Comments from "./components/Comments/Comments";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { fetchBookshelfData } from "./store/bookshelf-actions";
import { useDispatch } from "react-redux";

function App() {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      dispatch(fetchBookshelfData(userId));
    }
  }, [currentUser, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<BookSearch />} />
          <Route path=":pageid" element={<BookPage />} />
          <Route
            path="bookshelf"
            element={
              <PrivateRoute>
                <BookshelfLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Favorites />} />
            <Route path="inprogress" element={<InProgress />} />
            <Route path="completed" element={<Completed />} />
            <Route path=':pageid' element={<BookPage><CommentsForm/><Comments/></BookPage>} />
          </Route>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
