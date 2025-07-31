import { configureStore } from '@reduxjs/toolkit';
import savedGamesReducer from '@src/store/slices/savedGamesSlice';

export const store = configureStore({
  reducer: {
    savedGames: savedGamesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
