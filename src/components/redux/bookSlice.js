import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookSlice';
import categoriesReduces from './categoriesSlice';

const store = configureStore({
  reducer: {
    book: bookReducer,
    categories: categoriesSlice,
  },
});

export default store;