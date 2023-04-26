import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookSearch from "./components/BookSearch/BookSearch";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import BookshelfLayout from "./components/SharedLayout/BookshelfLayout";
import Profile from "./components/Profile/Profile";
import InProgress from "./components/Bookshelf/InProgress/InProgress";
import Completed from "./components/Bookshelf/Completed/Completed";
import ToRead from "./components/Bookshelf/ToRead/ToRead";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<BookSearch />} />
          <Route path='bookshelf' element={<BookshelfLayout />}>
            <Route index element={<ToRead />} />
            <Route path='inprogress' element={<InProgress />} />
            <Route path='completed' element={<Completed />} />
          </Route>
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
