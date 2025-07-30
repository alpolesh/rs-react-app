import { createSlice } from '@reduxjs/toolkit';

interface GameDetails {
  name?: string;
  description?: string;
  gameId: string;
}

type SavedGamesState = Record<string, GameDetails>;

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
