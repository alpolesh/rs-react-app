import { useEffect, useRef, useState } from 'react';

function useHighlightOnChange<T>(value: T, duration = 1000) {
  const [highlight, setHighlight] = useState(false);
  const prevRef = useRef<T>(null);

  useEffect(() => {
    if (prevRef.current !== undefined && prevRef.current !== value) {
      setHighlight(true);
      const t = setTimeout(() => setHighlight(false), duration);
      return () => clearTimeout(t);
    }
    prevRef.current = value;
  }, [value, duration]);

  return highlight;
}

export default useHighlightOnChange;
