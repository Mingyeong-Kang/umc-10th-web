import { useRef, useCallback, useEffect } from "react";

function useThrottle(callback: () => void, interval: number = 1000) {
  const lastCalledRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return useCallback(() => {
    const now = Date.now();
    const remaining = interval - (now - lastCalledRef.current);

    if (remaining <= 0) {
      // 인터벌 지났으면 즉시 실행
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      lastCalledRef.current = now;
      callbackRef.current();
    } else {
      // 인터벌 안 지났으면 남은 시간 후 실행 예약
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        lastCalledRef.current = Date.now();
        timeoutRef.current = null;
        callbackRef.current();
      }, remaining);
    }
  }, [interval]);
}

export default useThrottle;