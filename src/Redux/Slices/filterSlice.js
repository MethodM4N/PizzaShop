import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryIndex: 0,
  activeSort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCategoryIndex(state, action) {
      state.categoryIndex = action.payload;
    },
    setActiveSortName(state, action) {
      state.activeSort = action.payload;
    },
    setPathParams(state, action) {
      state.categoryIndex = Number(action.payload.categoryIndex);
      state.activeSort = action.payload.sort;
    },
  },
});

export const selectFilter = (state) => state.filterSlice;

export const { setCategoryIndex, setActiveSortName, setPathParams, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
