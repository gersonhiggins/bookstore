import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addBook, fetchBooks, removeBook } from '../redux/books/bookSlice';
import InputBooks from './logic/bookform';
import BookList from './logic/booklist';

const Home = () => {
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.book);
  function getInitialBooks() {
    const savedBooks = bookList.bookItems;
    return savedBooks || [];
  }
  const [books, setBooks] = useState(getInitialBooks());
  useEffect(() => {
    dispatch(fetchBooks());
    console.log(bookList.bookItems);
    setBooks([...books, bookList.bookItems]);
  }, []);
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
      {bookList.loading && <div>.....Loading</div>}
      <BookList bookProp={books} deleteBook={deleteBook} />
      <span className="span" />
      <InputBooks addBookItem={addBookItem} />
    </div>
  );
};

export default Home;
