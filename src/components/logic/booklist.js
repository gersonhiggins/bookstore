import PropTypes from 'prop-types';
import Bookitem from './bookitems';

const BookList = ({ bookProp, deleteBook }) => (
  <ul>
    {bookProp.map((book) => (
      <Bookitem key={book.id} bookProp={book} deleteBook={deleteBook} />
    ))}
  </ul>
);

BookList.propTypes = {
  bookProp: PropTypes.arrayOf(
    PropTypes.shape({
      map: PropTypes.number.isRequired,
    }),
  ).isRequired,
  deleteBook: PropTypes.func.isRequired,
};
export default BookList;
