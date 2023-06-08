const Bookitem = ({ bookProp, deleteBook }) => {
    return (
        <li className="book">
            <p className="category">{bookProp.cat}</p>
            <p className="tittle">{bookProp.tittle}</p>
            <p className="author">{bookProp.author}</p>
            <button className="remove" onClick={() => deleteBook(bookProp.id)}>Remove</button>
        </li>
    )
}

export default Bookitem;