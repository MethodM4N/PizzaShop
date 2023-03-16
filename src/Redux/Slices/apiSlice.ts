import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type TFetchPizzasArgs = {
  category: string;
  search: string;
  activeSort: {
    name: string;
    sortProperty: 'rating' | 'price' | 'title';
  };
};
// одно и то же, выше сокращение в случае если все ключи будут одного типа
/* type TFetchPizzasArgs = Record<string, string> */

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (params: TFetchPizzasArgs) => {
    const { category, search, activeSort } = params;
    const { data } = await axios.get<TPizzas[]>(
      `https://63b464300f49ecf50889ba66.mockapi.io/items?sortBy=${activeSort.sortProperty}&order=esc&${category}${search}`,
    );

    return data as TPizzas[];
  },
);

export type TPizzas = {
  id: string;
  title: string;
  sizes: number[];
  types: number[];
  price: number;
  imageUrl: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface IApiSlice {
  pizzas: TPizzas[];
  status: Status;
}

const initialState: IApiSlice = {
  pizzas: [],
  status: Status.LOADING,
};

export const apiSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<TPizzas[]>) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
  },

  //without typescript
  /*   extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.pizzas = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.pizzas = [];
    },
  }, */
});

export const { setPizzas } = apiSlice.actions;

export default apiSlice.reducer;
