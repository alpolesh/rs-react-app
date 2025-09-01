import { useEffect, useRef, useState } from 'react';

type RefProps<T> = {
  year: number | null;
  value: T | null;
};

function useHighlightOnYearChange<T>(value: T, year: number, duration = 1000) {
  const [highlight, setHighlight] = useState(false);
  const prevYearRef = useRef<RefProps<T>>({ year: null, value: null });
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      prevYearRef.current = { year, value };
      isFirstRender.current = false;
      return;
    }
    if (
      prevYearRef.current.year !== year &&
      prevYearRef.current.value !== value
    ) {
      setHighlight(true);
      setTimeout(() => setHighlight(false), duration);
      prevYearRef.current = { year, value };
    }
  }, [year, value, duration]);

  return highlight;
}

export default useHighlightOnYearChange;
