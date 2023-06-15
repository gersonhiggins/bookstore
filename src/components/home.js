import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { fetchBooks } from '../redux/books/bookSlice';
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
  }, [books]);
  const deleteBook = async (id) => {
    await fetch(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/kWYN1eenheRfyNQFSTzX/books/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setBooks([...books, bookList.bookItems]);
  };
  const addBookItem = async (cat, tittle, author) => {
    await fetch('https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/kWYN1eenheRfyNQFSTzX/books', {
      method: 'POST',
      body: JSON.stringify({
        category: cat,
        title: tittle,
        author,
        item_id: uuidv4(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
