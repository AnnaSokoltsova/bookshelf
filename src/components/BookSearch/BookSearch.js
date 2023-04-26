import React from "react";
import About from "./About/About";
import SearchForm from "./SearchForm/SearchForm";
import BookResults from "./BookResults/BookResults";
import Container from "../Container/Container";


export default function BookSearch() {
  return (
    <Container>
      <About />
      <SearchForm />
      <BookResults />
    </Container>
  );
}
