import { useState } from 'react';
import PropTypes from 'prop-types';

const InputBooks = ({ addBookItem }) => {
  const [cat, setCat] = useState('');
  const [tittle, setTittle] = useState('');
  const [aut, setAut] = useState('');
  const [message, setMessage] = useState('');
  const handleTittleChange = (e) => {
    setTittle(e.target.value);
  };
  const handleAuthorChange = (e) => {
    setAut(e.target.value);
  };
  const handleCatChange = (e) => {
    setCat(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tittle.trim() && aut.trim() && cat.trim()) {
      addBookItem(cat, tittle, aut);
      setTittle('');
      setAut('');
      setMessage('');
      setCat('');
    } else {
      setMessage('Please add book name, author and category');
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Add new book</h2>
        <div className="inputs">
          <input
            type="text"
            placeholder="book title"
            value={tittle}
            onChange={handleTittleChange}
            className="input-tittle"
          />
          <input
            type="text"
            placeholder="author"
            value={aut}
            onChange={handleAuthorChange}
            className="input=author"
          />
          <select id="category" name="category" value={cat} onChange={handleCatChange}>
            <option value="" disabled hidden>Category</option>
            <option value="Ficton">Fiction</option>
            <option value="Action">Action</option>
            <option value="Romance">Romance</option>
            <option value="Comedy">Comedy</option>
            <option value="Nonficton">Nonfiction</option>
          </select>
          <button type="submit" className="input-submit">ADD BOOK</button>
        </div>
      </form>
      <span className="submit-warning">{message}</span>
    </div>
  );
};

InputBooks.propTypes = {
  addBookItem: PropTypes.func.isRequired,
};

export default InputBooks;
