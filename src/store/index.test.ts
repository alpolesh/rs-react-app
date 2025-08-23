import { setupStore } from './index';
import {
  saveUncontrolledFormData,
  saveReactHookFormData,
} from './slices/formsDataSlice';

describe('store integration', () => {
  it('should update state when saveUncontrolledFormData is dispatched', () => {
    const store = setupStore();
    const mockData = [{ name: 'name', value: 'Andrei' }];

    store.dispatch(saveUncontrolledFormData(mockData));

    const state = store.getState();
    expect(state.formsData.uncontrolledFormData).toEqual(mockData);
  });

  it('should update state when saveReactHookFormData is dispatched', () => {
    const store = setupStore();
    const mockData = [{ name: 'email', value: 'test@mail.com' }];

    store.dispatch(saveReactHookFormData(mockData));

    const state = store.getState();
    expect(state.formsData.reactHookFormData).toEqual(mockData);
  });
});
