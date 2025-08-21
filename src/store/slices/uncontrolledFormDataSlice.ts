import { createSlice } from '@reduxjs/toolkit';
import type { FormDataState } from '@src/types/FormDataState';

const initialState: FormDataState | null = null;

const uncontrolledFormDataSlice = createSlice({
  name: 'uncontrolledFormData',
  initialState,
  reducers: {
    saveUncontrolledFormData: (_, action) => {
      return action.payload;
    },
  },
});

export const { saveUncontrolledFormData } = uncontrolledFormDataSlice.actions;
export default uncontrolledFormDataSlice.reducer;
