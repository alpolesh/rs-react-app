import formsDataReducer, {
  saveUncontrolledFormData,
  saveReactHookFormData,
} from './formsDataSlice';

describe('formsDataSlice', () => {
  const mockData = [
    { name: 'name', value: 'Andrei' },
    { name: 'age', value: '32' },
  ];

  it('should return the initial state', () => {
    expect(formsDataReducer(undefined, { type: 'unknown' })).toEqual({
      uncontrolledFormData: null,
      reactHookFormData: null,
    });
  });

  it('should handle saveUncontrolledFormData', () => {
    const result = formsDataReducer(
      undefined,
      saveUncontrolledFormData(mockData)
    );
    expect(result.uncontrolledFormData).toEqual(mockData);
  });

  it('should handle saveReactHookFormData', () => {
    const result = formsDataReducer(undefined, saveReactHookFormData(mockData));
    expect(result.reactHookFormData).toEqual(mockData);
  });
});
