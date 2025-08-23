import { configureStore } from '@reduxjs/toolkit';
import countriesSliceReducer from '@src/store/slices/countriesSlice';
import formsDataSliceReducer from '@src/store/slices/formsDataSlice';

export const setupStore = () =>
  configureStore({
    reducer: {
      countries: countriesSliceReducer,
      formsData: formsDataSliceReducer,
    },
  });

export type RootState = ReturnType<ReturnType<typeof setupStore>['getState']>;
export type AppDispatch = ReturnType<typeof setupStore>['dispatch'];

export const store = setupStore();
