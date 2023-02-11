import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullCount: 0,
  fullPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.fullPrice = state.fullPrice + action.payload.price;
      ++state.fullCount;
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        action.payload.count = 1;
        state.items.push(action.payload);
      }
    },
    minusItem(state, action) {
      state.fullPrice = state.fullPrice - action.payload.price;
      --state.fullCount;
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      state.fullCount = state.fullCount - findItem.count;
      state.fullPrice = state.fullPrice - findItem.price * findItem.count;
    },
    clearItems(state) {
      state.items = [];
      state.fullCount = 0;
      state.fullPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cartSlice;

export const { addToCart, clearItems, minusItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
