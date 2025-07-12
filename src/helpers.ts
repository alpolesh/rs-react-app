export const calculateWaitTime = (
  minSpinnerTime: number,
  startTime: number
) => {
  const elapsed = Date.now() - startTime;
  return Math.max(0, minSpinnerTime - elapsed);
};
