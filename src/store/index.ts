import { configureStore } from '@reduxjs/toolkit';
import savedGamesReducer from '@src/store/slices/savedGamesSlice';
import { gamesApi } from '@src/store/api/gamesApi';

export const setupStore = () =>
  configureStore({
    reducer: {
      savedGames: savedGamesReducer,
      [gamesApi.reducerPath]: gamesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(gamesApi.middleware),
  });

export type RootState = ReturnType<ReturnType<typeof setupStore>['getState']>;
export type AppDispatch = ReturnType<typeof setupStore>['dispatch'];

export const store = setupStore();
