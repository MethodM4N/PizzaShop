import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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

export const { setCategoryIndex, setActiveSortName, setPathParams } = filterSlice.actions;

export default filterSlice.reducer;
