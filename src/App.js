import { HashRouter, Routes, Route } from "react-router-dom";
import {
  BookSearch,
  BookPage,
  SharedLayout,
  BookshelfLayout,
  PrivateRoute,
  Profile,
  SignIn,
  SignUp,
  CommentsForm,
  Comments,
  ForgotPassword
} from "./components";

import BookshelfContainer from "./layout/BooksContainer/BookshelfContainer";

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
    <HashRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<BookSearch />} />
          <Route path=":pageid" element={<BookPage />} />
          <Route
            path="personalshelf"
            element={
              <PrivateRoute>
                <BookshelfLayout />
              </PrivateRoute>
            }
          >
            <Route path="toread" element={<BookshelfContainer type='toRead' />} />
            <Route path="inprogress" element={<BookshelfContainer type='inProgress' />} />
            <Route path="completed" element={<BookshelfContainer type='completed' />} />
            <Route
              path=":pageid"
              element={
                <BookPage>
                  <CommentsForm />
                  <Comments />
                </BookPage>
              }
            />
          </Route>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="profile" element={<Profile />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
