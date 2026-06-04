import { useEffect, useRef, useState } from "react";

// useThrottle: 주어진 값이 자주 변경될 때
// 최소 interval(delay) 간격으로만 업데이트해서 성능을 개선한다.
function useThrottle<T>(value: T, delay: number = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);

  // 마지막으로 실행된 시간을 저장하는 변수
  // useRef를 사용하면 값이 변경되어도 리렌더링을 발생시키지 않는다.
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    if (Date.now() >= lastExecuted.current + delay) {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, delay);

      return () => clearTimeout(timerId);
    }
  }, [value, delay]);

  return throttledValue;
}

export default useThrottle;
