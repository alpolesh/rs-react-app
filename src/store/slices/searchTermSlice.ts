import { createSlice } from '@reduxjs/toolkit';

type SearchTerm = string;

const initialState: SearchTerm =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('searchTerm') || '""')
    : '';

const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState,
  reducers: {
    setSearchTerm: (_, action) => {
      return action.payload;
    },
  },
});

export const { setSearchTerm } = searchTermSlice.actions;
export default searchTermSlice.reducer;
