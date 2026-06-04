import { useCallback, useEffect, useRef } from "react";

type AnyCallback = (...args: never[]) => void;

export const useThrottle = <T extends AnyCallback>(
  callback: T,
  interval: number
): ((...args: Parameters<T>) => void) => {
  const lastCalledRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef<T>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      lastCalledRef.current = 0;
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const elapsed = now - lastCalledRef.current;

      if (elapsed >= interval) {
        lastCalledRef.current = now;
        callbackRef.current(...args);
        return;
      }

      if (timerRef.current) return;

      timerRef.current = setTimeout(() => {
        lastCalledRef.current = Date.now();
        timerRef.current = null;
        callbackRef.current(...args);
      }, interval - elapsed);
    },
    [interval]
  );
};
