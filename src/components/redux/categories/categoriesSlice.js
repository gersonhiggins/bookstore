import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    filterCategories: (state, action) => {
      const filterCat = state.categories.filter((book) => book.cat === action.payload);
      filterCat.status = 'w';
    },
    checkStatus: (state, action) => {
      state.categories = action.payload === 'Under construction'
        ? 'Under construction'
        : state.categories;
    },
  },
});

export const { filterCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
