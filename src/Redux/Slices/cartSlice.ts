import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorageCart } from '../../utils/getLocalStorageCart';
import { RootState } from '../Store';

export type TItems = {
  id: string;
  title: string;
  size: number;
  doughType: string;
  price: number;
  count: number;
  imageUrl: string;
};

export interface ICartSlice {
  fullCount: number;
  fullPrice: number;
  items: TItems[];
}

const { items, fullPrice, fullCount } = getLocalStorageCart();

const initialState: ICartSlice = {
  fullCount,
  fullPrice,
  items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<TItems>) {
      state.fullPrice = state.fullPrice + action.payload.price;
      ++state.fullCount;
      const findItem = state.items.find((obj) => {
        return (
          obj.id === action.payload.id + `/${action.payload.size}` + `/${action.payload.doughType}`
        );
      });
      if (findItem) {
        findItem.count++;
      } else {
        action.payload.id =
          action.payload.id + `/${action.payload.size}` + `/${action.payload.doughType}`;
        action.payload.count = 1;
        state.items.push(action.payload);
      }
    },
    plusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count++;
        state.fullPrice = state.fullPrice + findItem.price;
        ++state.fullCount;
      }
    },
    minusItem(state, action: PayloadAction<string>) {
      /* state.fullPrice = state.fullPrice - action.payload.price;
      --state.fullCount; */
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.fullPrice = state.fullPrice - findItem.price;
        --state.fullCount;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      if (findItem) {
        state.fullCount = state.fullCount - findItem.count;
        state.fullPrice = state.fullPrice - findItem.price * findItem.count;
      }
    },
    clearItems(state) {
      state.items = [];
      state.fullCount = 0;
      state.fullPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cartSlice;

export const { addToCart, clearItems, plusItem, minusItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
