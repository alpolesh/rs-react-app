import { createSlice } from '@reduxjs/toolkit';
import type { SavedGamesState } from '@src/types/store/savedGamesSlice';

const savedGamesSlice = createSlice({
  name: 'savedGames',
  initialState: {} as SavedGamesState,
  reducers: {
    setSavedGame: (state, action) => {
      const { gameId, details } = action.payload;
      state[gameId] = { ...details };
    },
    deleteSavedGame: (state, action) => {
      const gameId = action.payload;
      delete state[gameId];
    },
  },
});

export const { setSavedGame, deleteSavedGame } = savedGamesSlice.actions;
export default savedGamesSlice.reducer;
