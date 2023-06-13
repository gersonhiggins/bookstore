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
    const remove = dispatch(removeBook(id));
    const bookStorage = JSON.parse(localStorage.getItem('books'));
    const filteredBooks = bookStorage.filter((item) => item.id !== id);
    const temp = JSON.stringify(filteredBooks);
    localStorage.setItem('books', temp);
    setBooks([...books, remove.state]);
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
