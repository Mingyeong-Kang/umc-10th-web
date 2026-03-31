import { useState, useEffect, useCallback } from "react";

export function useRouter() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const push = useCallback((to: string) => {
    window.history.pushState(null, "", to);
    setPath(to);
  }, []);

  return { path, push };
}
