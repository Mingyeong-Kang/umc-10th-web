import { useEffect, useState } from "react";
import useThrottle from "../hooks/useThrottle.ts";

const ThrottlePage = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  const throttledScrollY = useThrottle(scrollY, 2000);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log("리렌더링");

  return (
    <div className="flex min-h-[200vh] flex-col items-center justify-center">
      <div>
        <h1>쓰로틀링이 무엇일까요?</h1>
        <p>ScrollY : {throttledScrollY}px</p>
      </div>
    </div>
  );
};

export default ThrottlePage;
