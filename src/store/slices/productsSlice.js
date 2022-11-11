import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProductsStatus',
  async (params) => {
    const { byAlphabet } = params;
    const { data } = await axios.get(
      `http://localhost:3001/products?_sort=${byAlphabet}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: 'loading',
  lastAction: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    handleProduct(state, action) {
      state.productStatus = action.payload;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchProducts.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { handleProduct } = productsSlice.actions;

export default productsSlice.reducer;
