import { useEffect, useRef, useState } from "react";

export default function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const remaining = delay - (now - lastExecuted.current);

    if (remaining <= 0) {
      setThrottledValue(value);
      lastExecuted.current = now;
      return;
    }

    const timer = setTimeout(() => {
      setThrottledValue(value);
      lastExecuted.current = Date.now();
    }, remaining);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return throttledValue;
}