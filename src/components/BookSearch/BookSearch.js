import React from "react";
import About from "./About/About";
import SearchForm from "./SearchForm/SearchForm";
import BookSearchResults from "../../layout/BooksContainer/BookSearchResults";
import Container from "../Container/Container";

export default function BookSearch() {
  return (
    <Container>
      <About />
      <SearchForm />
      <BookSearchResults type="search"/>
    </Container>
  );
}
