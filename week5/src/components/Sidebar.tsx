import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* 배경 오버레이 (모바일) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* 사이드바 본체 */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-60 bg-gray-900 z-30 pt-16
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:block
        `}
      >
        <nav className="flex flex-col gap-2 p-4">
          <NavLink
            to="/lps"
            onClick={onClose}
            className={({ isActive }) =>
              `text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition
               ${isActive ? "bg-gray-700 font-bold" : ""}`
            }
          >
            🎵 LP 목록
          </NavLink>
          <NavLink
            to="/my"
            onClick={onClose}
            className={({ isActive }) =>
              `text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition
               ${isActive ? "bg-gray-700 font-bold" : ""}`
            }
          >
            👤 마이페이지
          </NavLink>
        </nav>
      </aside>
    </>
  );
}