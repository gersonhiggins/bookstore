import { createSlice } from '@reduxjs/toolkit';

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
