import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // delay 후 값 변경
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // value 변경 or 언마운트 시 타이머 제거
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;