import PropTypes from 'prop-types';

const Bookitem = ({ bookProp, deleteBook }) => (
  <li className="book">
    <p className="category">{bookProp.cat}</p>
    <p className="tittle">{bookProp.tittle}</p>
    <p className="author">{bookProp.author}</p>
    <button type="button" className="remove" onClick={() => deleteBook(bookProp.id)}>Remove</button>
  </li>
);

Bookitem.propTypes = {
  bookProp: PropTypes.arrayOf(
    PropTypes.shape({
      cat: PropTypes.string.isRequired,
      tittle: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  deleteBook: PropTypes.func.isRequired,
};
export default Bookitem;
