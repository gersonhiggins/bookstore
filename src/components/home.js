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
                <div className="book-content">
                  <p className="category">{book.cat}</p>
                  <p className="tittle">{book.tittle}</p>
                  <p className="author">{book.author}</p>
                  <div className="buttons">
                    <button type="button" className="remove">Comments</button>
                    <button type="button" className="remove" onClick={() => deleteBook(book.id)}>Remove</button>
                    <button type="button" className="remove">Edit</button>
                  </div>
                </div>
                <div className="info">
                  <div className="donut">
                    <div className="outer">
                      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width=" 90px" height="90px">
                        <defs>
                          <linearGradient id="GradientColor">
                            <stop offset="0%" stopColor="#e91e63" />
                            <stop offset="100%" stopColor="#673ab7" />
                          </linearGradient>
                        </defs>
                        <circle cx="45" cy="45" r="40" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="completed">
                    <p className="porcentage">50%</p>
                    <p className="category">Completed</p>
                  </div>
                  <span className="v-span" />
                </div>
                <div className="chapter">
                  <p className="current">Current Chapter</p>
                  <p className="c-chapter">Chapter 1</p>
                  <button type="button" className="update-chapter">UPDATE PROGRESS</button>
                </div>
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
