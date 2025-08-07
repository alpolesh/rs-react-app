import getErrorMessage from '@src/helpers/getErrorMessage';

describe('getErrorMessage', () => {
  it('returns undefined if error is undefined', () => {
    expect(getErrorMessage(undefined)).toBeUndefined();
  });

  it('returns string error.data if status is in error and data is string', () => {
    const error = {
      status: 500,
      data: 'Something went wrong',
    };
    expect(getErrorMessage(error)).toBe('Something went wrong');
  });

  it('returns JSON stringified error.data if status is in error and data is object', () => {
    const error = {
      status: 400,
      data: { message: 'Bad request' },
    };
    expect(getErrorMessage(error)).toBe(
      JSON.stringify({ message: 'Bad request' })
    );
  });
});
