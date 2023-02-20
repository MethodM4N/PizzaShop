import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';

export enum SortPropertyEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export type TActiveSort = {
  name: string;
  sortProperty: SortPropertyEnum;
}

export interface IFilterSlice {
  searchValue: string;
  categoryIndex: number;
  activeSort: TActiveSort,
}

const initialState: IFilterSlice = {
  searchValue: '',
  categoryIndex: 0,
  activeSort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING,
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryIndex(state, action: PayloadAction<number>) {
      state.categoryIndex = action.payload;
    },
    setActiveSortName(state, action: PayloadAction<TActiveSort>) {
      state.activeSort = action.payload;
    },
    setPathParams(state, action) {
      console.log(action.payload);
      state.categoryIndex = Number(action.payload.categoryIndex);
      state.activeSort = action.payload.activeSort;
    },
  },
});

export const selectFilter = (state: RootState) => state.filterSlice;

export const { setCategoryIndex, setActiveSortName, setPathParams, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
