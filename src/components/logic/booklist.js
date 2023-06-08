import Bookitem from "./bookitems";
const BookList = ({ bookProp, deleteBook }) => {
    return (
            <ul>
                {bookProp.map((book) => (
                    <Bookitem key={book.id} bookProp={book} deleteBook={deleteBook} />
                ))}
            </ul>
    )
}

export default BookList;