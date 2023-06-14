import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const uniqueApiId = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/kWYN1eenheRfyNQFSTzX/books';

const initialState = {
  bookItems: [],
  loading: false,
  error: 'Cant Load',
};
export const fetchBooks = createAsyncThunk('book/fetchBooks', async () => {
  const response = await axios.get(uniqueApiId);
  const result = [];
  const keys = Object.keys(response.data);
  const values = Object.values(response.data);
  for (let i = 0; i < keys.length; i += 1) {
    result.push({
      cat: values[i][0].category,
      tittle: values[i][0].title,
      author: values[i][0].author,
      id: keys[i],
    });
  }
  return result;
});
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
  extraReducers: (build) => {
    build.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
    });
    build.addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.bookItems = action.payload;
      state.error = '';
    });
    build.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.bookItems = [];
      state.error = action.error.message;
    });
  },
});

export const { addBook, removeBook } = bookSlice.actions;
export const bookArray = ({ book }) => book;
export default bookSlice.reducer;
