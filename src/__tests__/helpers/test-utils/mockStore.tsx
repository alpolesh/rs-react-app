import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import savedGamesReducer from '@src/store/slices/savedGamesSlice';

export function renderWithStore(ui: ReactNode, initialState = {}) {
  const store = configureStore({
    reducer: {
      savedGames: savedGamesReducer,
    },
    preloadedState: initialState,
  });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}
