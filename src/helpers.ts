export const calculateWaitTime = (
  minSpinnerTime: number,
  startTime: number
) => {
  const elapsed = Date.now() - startTime;
  return Math.max(0, minSpinnerTime - elapsed);
};

export const getItemFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setItemToLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};
