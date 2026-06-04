import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useThrottle from "../hooks/useThrottle";

export default function Sidebar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const throttledWidth = useThrottle(windowWidth, 200);
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const isDesktop = throttledWidth >= 768;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setIsOpen(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    if (isDesktop) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!sidebarRef.current) return;
      if (!sidebarRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isDesktop]);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-sm ${
      isActive ? "bg-pink-100 text-pink-600 font-semibold" : "hover:bg-gray-100"
    }`;

  return (
    <>
      {!isDesktop && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-20 left-4 z-50 rounded-md border bg-white px-3 py-2 shadow"
          aria-label="사이드바 열기"
        >
          ☰
        </button>
      )}

      {!isDesktop && isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40" />
      )}

      <aside
        ref={sidebarRef}
        className={[
          "fixed top-16 left-0 z-50 h-[calc(100vh-64px)] w-64 border-r bg-white p-4 transition-transform duration-300",
          isDesktop ? "translate-x-0" : isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold text-pink-600">
            돌려돌려LP판
          </Link>
          {!isDesktop && (
            <button onClick={() => setIsOpen(false)} className="text-gray-500">
              ✕
            </button>
          )}
        </div>

        <nav className="space-y-2">
          <NavLink to="/" className={navClass} onClick={() => setIsOpen(false)}>
            LP 목록
          </NavLink>
          <NavLink to="/mypage" className={navClass} onClick={() => setIsOpen(false)}>
            마이페이지
          </NavLink>
          <NavLink to="/login" className={navClass} onClick={() => setIsOpen(false)}>
            로그인
          </NavLink>
        </nav>

        <div className="mt-6 rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
          <p>반응형 사이드바</p>
          <p>width: {throttledWidth}px</p>
          <p>resize는 throttle 처리됨</p>
        </div>
      </aside>
    </>
  );
}