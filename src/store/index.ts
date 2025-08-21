import { configureStore } from '@reduxjs/toolkit';
import countriesSliceReducer from '@src/store/slices/countriesSlice';
import uncontrolledFormDataSliceReducer from '@src/store/slices/uncontrolledFormDataSlice';

export const setupStore = () =>
  configureStore({
    reducer: {
      countries: countriesSliceReducer,
      uncontrolledFormData: uncontrolledFormDataSliceReducer,
    },
  });

export type RootState = ReturnType<ReturnType<typeof setupStore>['getState']>;
export type AppDispatch = ReturnType<typeof setupStore>['dispatch'];

export const store = setupStore();
