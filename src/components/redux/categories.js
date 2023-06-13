import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
};

export const categories = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    filterCategories: (state, action) => {
      const filterCat = state.categories.filter((book) => book.cat === action.payload);
      filterCat.status = 'w';
    },
  },
});

export const { filterCategories } = categories.actions;
export default categories.reducer;
