import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    removeBook: (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },

  },
});

export const { addBook, removeBook } = bookSlice.actions;
export const bookArray = ({ book }) => book;
export default bookSlice.reducer;
