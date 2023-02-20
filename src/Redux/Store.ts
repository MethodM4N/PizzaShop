import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './Slices/filterSlice';
import cartSlice from './Slices/cartSlice';
import apiSlice from './Slices/apiSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    apiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;