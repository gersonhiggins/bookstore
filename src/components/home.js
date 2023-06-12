import React, { useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';
import InputBooks from './logic/bookform';
import BookList from './logic/booklist';

const Home = () => {
  function getInitialBooks() {
    const temp = localStorage.getItem('books');
    const savedBooks = JSON.parse(temp);
    return savedBooks || [];
  }
  const [books, setBooks] = useState(getInitialBooks());
  useEffect(() => {
    const temp = JSON.stringify(books);
    localStorage.setItem('books', temp);
  }, [books]);
  const deleteBook = (id) => {
    setBooks([
      ...books.filter((book) => book.id !== id),
    ]);
  };
  const addBookItem = (cat, tittle, author) => {
    const newBook = {
      id: uuidv4(),
      cat,
      tittle,
      author,
    };
    setBooks([...books, newBook]);
  };
  return (
    <div className="home-page">
      <BookList bookProp={books} deleteBook={deleteBook} />
      <span className="span" />
      <InputBooks addBookItem={addBookItem} />
    </div>
  );
};

export default Home;
