import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MENU = [
  { to: "/", label: "찾기" },
  { to: "/search", label: "검색" },
  { to: "/my", label: "마이페이지" },
];

export const Sidebar = ({ isOpen, onClose }: Props) => {
  const sidebarRef = useRef<HTMLElement>(null);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          aria-hidden
        />
      )}
      <aside
        ref={sidebarRef}
        className={`fixed lg:sticky top-0 left-0 h-screen w-60 bg-[#111111] border-r border-gray-800 z-40 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-2 p-5 pt-20 lg:pt-5">
          {!isAuthenticated && (
            <div className="flex flex-col gap-2 mb-3">
              <NavLink
                to="/login"
                onClick={onClose}
                className="text-center px-3 py-2 bg-[#b2dab1] text-black font-bold rounded"
              >
                로그인
              </NavLink>
              <NavLink
                to="/signup"
                onClick={onClose}
                className="text-center px-3 py-2 border border-gray-600 text-white rounded"
              >
                회원가입
              </NavLink>
            </div>
          )}

          {isAuthenticated && user && (
            <div className="mb-3 px-2 py-3 border-b border-gray-700">
              <p className="text-sm text-gray-400">반갑습니다,</p>
              <p className="text-white font-bold truncate">{user.name}님</p>
            </div>
          )}

          {MENU.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `px-3 py-2 rounded transition-colors ${
                  isActive
                    ? "bg-gray-800 text-[#b2dab1] font-bold"
                    : "text-gray-300 hover:bg-gray-800"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {isAuthenticated && (
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="mt-3 px-3 py-2 text-left text-gray-400 hover:bg-gray-800 rounded"
            >
              로그아웃
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
