import { createSlice } from '@reduxjs/toolkit';

interface GameDetails {
  name?: string;
  description?: string;
  key: string;
}

type SavedGamesState = Record<string, GameDetails>;

const savedGamesSlice = createSlice({
  name: 'savedGames',
  initialState: {} as SavedGamesState,
  reducers: {
    setSavedGame: (state, action) => {
      const { key, details } = action.payload;
      state[key] = { ...details };
    },
    deleteSavedGame: (state, action) => {
      const key = action.payload;
      delete state[key];
    },
  },
});

export const { setSavedGame, deleteSavedGame } = savedGamesSlice.actions;
export default savedGamesSlice.reducer;
