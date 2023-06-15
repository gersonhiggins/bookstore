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
export const addFetchBook = createAsyncThunk('book/addFetchBook', async (obj) => {
  await axios.post('https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/kWYN1eenheRfyNQFSTzX/books', obj);
});
export const removeFetchBook = createAsyncThunk('book/removeFetchBook', async (id) => {
  await axios.delete(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/kWYN1eenheRfyNQFSTzX/books/${id}`);
});
export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
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

export default bookSlice.reducer;
