import { createSlice } from '@reduxjs/toolkit';
import type { OrderedFormData } from '@src/types/FormDataState';

interface InitialState {
  uncontrolledFormData: OrderedFormData | null;
  reactHookFormData: OrderedFormData | null;
}

const initialState: InitialState = {
  uncontrolledFormData: null,
  reactHookFormData: null,
};

const formsDataSlice = createSlice({
  name: 'formsData',
  initialState,
  reducers: {
    saveUncontrolledFormData: (state, action) => {
      state.uncontrolledFormData = action.payload;
    },

    saveReactHookFormData: (state, action) => {
      state.reactHookFormData = action.payload;
    },
  },
});

export const { saveUncontrolledFormData, saveReactHookFormData } =
  formsDataSlice.actions;
export default formsDataSlice.reducer;
