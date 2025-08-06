import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

function getErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined
): string | undefined {
  if (!error) return undefined;
  if ('status' in error) {
    return typeof error.data === 'string'
      ? error.data
      : JSON.stringify(error.data);
  }
  if ('message' in error) return error.message;
  return JSON.stringify(error);
}

export default getErrorMessage;
