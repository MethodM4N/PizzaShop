import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
  const { category, search, activeSort } = params;
  console.log(activeSort.sortProperty);
  const { data } = await axios.get(
    `https://63b464300f49ecf50889ba66.mockapi.io/items?sortBy=${activeSort.sortProperty}&order=esc&${category}${search}`,
  );

  return data;
});

const initialState = {
  pizzas: [],
  status: 'loading',
};

export const apiSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.pizzas = action.payload;
      state.status = 'succes';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.pizzas = [];
    },
  },
});

export const { setPizzas } = apiSlice.actions;

export default apiSlice.reducer;
