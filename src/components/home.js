import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addFetchBook, removeFetchBook, fetchBooks } from '../redux/books/bookSlice';
import InputBooks from './logic/bookform';

const Home = () => {
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.book);
  function getInitialBooks() {
    return bookList.bookItems;
  }
  const [books, setBooks] = useState(getInitialBooks());
  useEffect(() => {
    dispatch(fetchBooks());
  }, [books, dispatch]);
  const deleteBook = async (id) => {
    await dispatch(removeFetchBook(id));
    setBooks([...books, bookList.bookItems]);
  };
  const addBookItem = async (cat, tittle, aut) => {
    const obj = {
      item_id: uuidv4(),
      author: aut,
      category: cat,
      title: tittle,
    };
    await dispatch(addFetchBook(obj));
    setBooks([...books, bookList.bookItems]);
  };
  return (
    <div className="home-page">
      {bookList.loading && <div>.....Loading</div>}
      {!bookList.loading && Object.keys(bookList.bookItems).length ? (
        <ul>
          {
            bookList.bookItems.map((book) => (
              <li className="book" key={book.id}>
                <p className="category">{book.cat}</p>
                <p className="tittle">{book.tittle}</p>
                <p className="author">{book.author}</p>
                <button type="button" className="remove" onClick={() => deleteBook(book.id)}>Remove</button>
              </li>
            ))
          }
        </ul>
      ) : null}
      <span className="span" />
      <InputBooks addBookItem={addBookItem} />
    </div>
  );
};

export default Home;
