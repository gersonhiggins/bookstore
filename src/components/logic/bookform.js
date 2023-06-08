import { useState  } from "react";

const InputBooks = ( { addBookItem }) => {
    const [cat, setCat] = useState('');
    const [tittle, setTittle] = useState('');
    const [author, setAuthor] = useState('');
    const [message, setMessage] = useState('');
    const handleTittleChange = (e) => {
        setTittle(e.target.value);
      };
    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
    }
    const handleCatChange = (e) => {
        setCat(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(tittle.trim() && author.trim() && cat.trim()) {
            addBookItem(cat, tittle, author);
            setTittle('');
            setAuthor('');
            setMessage('');
            setCat('');
        } else {
            setMessage('Please add book name, author and category');
        }
    }
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
               value={author}
               onChange={handleAuthorChange}
               className="input=author"
               />
               <select id="category" name="category" value={cat} onChange={handleCatChange} >
                    <option value="" disabled hidden>Category</option>
                    <option>Si-Fi</option>
                    <option value="action">Action</option>
                    <option value="romance">Romance</option>
                    <option value="comedy">Comedy</option>
               </select> 
               <button className="input-submit">ADD BOOK</button>
               </div>
            </form>
            <span className="submit-warning">{message}</span>
        </div>
    )
}

export default InputBooks;