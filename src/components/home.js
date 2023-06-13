import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addBook, removeBook } from '../redux/books/bookSlice';
import InputBooks from './logic/bookform';
import BookList from './logic/booklist';

const Home = () => {
  const dispatch = useDispatch();
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
      ...books.filter((book) => book.id !== id, dispatch(removeBook())),
    ]);
  };
  const addBookItem = (cat, tittle, author) => {
    const newBook = dispatch(addBook({
      cat,
      tittle,
      author,
      id: uuidv4(),
    }));
    setBooks([...books, newBook.payload]);
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
