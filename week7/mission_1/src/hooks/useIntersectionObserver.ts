import { useEffect, useRef } from "react";

interface Options {
  onIntersect: () => void;
  enabled?: boolean;
  rootMargin?: string;
  threshold?: number;
}

export const useIntersectionObserver = <T extends HTMLElement>({
  onIntersect,
  enabled = true,
  rootMargin = "200px",
  threshold = 0,
}: Options) => {
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [onIntersect, enabled, rootMargin, threshold]);

  return targetRef;
};
