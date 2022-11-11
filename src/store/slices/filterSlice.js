import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortType: {
    name: 'алфавітом (ASC)',
    sortProperty: 'name,count&_order=asc,desc',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSortType(state, action) {
      state.sortType = action.payload;
    },
  },
});

export const { setSortType } = filterSlice.actions;

export default filterSlice.reducer;
