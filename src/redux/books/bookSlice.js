import { createSlice } from '@reduxjs/toolkit';

const initial = [
  {
    id: 'item1',
    tittle: 'The Great Gatsby',
    author: 'John Smith',
    cat: 'Fiction',
  },
  {
    id: 'item2',
    tittle: 'Anna Karenina',
    author: 'Leo Tolstoy',
    cat: 'Fiction',
  },
  {
    id: 'item3',
    tittle: 'The Selfish Gene',
    author: 'Richard Dawkins',
    cat: 'Nonfiction',
  },
];
const temp = JSON.stringify(initial);
localStorage.setItem('books', temp);
const initialState = {
  bookItems: JSON.parse(localStorage.getItem('books')),
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.bookItems.push(action.payload);
    },
    removeBook: (state, action) => {
      const itemId = action.payload;
      state.bookItems = state.bookItems.filter((item) => item.id !== itemId);
    },

  },
});

export const { addBook, removeBook } = bookSlice.actions;
export const bookArray = ({ book }) => book;
export default bookSlice.reducer;
