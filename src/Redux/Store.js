import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './Slices/filterSlice';
import cartSlice from './Slices/cartSlice';
import apiSlice from './Slices/apiSlice';

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    apiSlice,
  },
});
