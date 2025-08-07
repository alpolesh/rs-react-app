import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import savedGamesReducer from '@src/store/slices/savedGamesSlice';
import { gamesApi } from '@src/store/api/gamesApi';

export function renderWithStore(ui: ReactNode, initialState = {}) {
  const store = configureStore({
    reducer: {
      savedGames: savedGamesReducer,
      [gamesApi.reducerPath]: gamesApi.reducer,
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(gamesApi.middleware),
  });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}
