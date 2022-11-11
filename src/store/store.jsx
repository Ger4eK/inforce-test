import { configureStore } from '@reduxjs/toolkit';
import products from './slices/productsSlice';
import filters from './slices/filterSlice';

const store = configureStore({
  reducer: { products, filters },
});

export default store;
