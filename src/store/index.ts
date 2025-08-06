import { configureStore } from '@reduxjs/toolkit';
import savedGamesReducer from '@src/store/slices/savedGamesSlice';
import { gamesApi } from '@src/store/api/gamesApi';

export const store = configureStore({
  reducer: {
    savedGames: savedGamesReducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gamesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
