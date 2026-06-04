import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useCartStore from "../store/useCartStore";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const navigate = useNavigate();
  const { name, logout } = useContext(AuthContext);
  const { amount } = useCartStore();

  const navLinks = [
    { to: "/", label: "홈" },
    { to: "/movies/popular", label: "인기 영화" },
    { to: "/movies/now-playing", label: "현재 상영 중" },
    { to: "/movies/upcoming", label: "개봉 예정" },
    { to: "/movies/top-rated", label: "평점 높은" },
    { to: "/lps", label: "LP 목록" },
    { to: "/search", label: "검색" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-900 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      
      {/* 왼쪽 */}
      <div className="flex items-center gap-4">
        
        {/* 햄버거 버튼 */}
        <button
          onClick={onMenuClick}
          className="text-white hover:text-pink-400 transition"
          aria-label="메뉴 열기/닫기"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M7.95 11.95h32m-32 12h32m-32 12h32"
            />
          </svg>
        </button>

        {/* 로고 */}
        <NavLink
          to="/"
          className="text-pink-500 font-bold text-xl shrink-0"
        >
          🎵 젼졔의 LP & MOVIE
        </NavLink>

        {/* 메뉴 */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm px-3 py-1.5 rounded-lg transition ${
                  isActive
                    ? "bg-gray-700 text-white font-semibold"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* 오른쪽 */}
      <div className="flex items-center gap-3">

        {/* 장바구니 버튼 */}
        <button
          onClick={() => navigate("/cart")}
          className="relative text-white hover:text-pink-400 transition"
          aria-label="장바구니"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {amount > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {amount}
            </span>
          )}
        </button>

        {/* 마이페이지 */}
        <button
          onClick={() => navigate("/my")}
          className="px-3 py-1.5 border border-gray-500 rounded-lg text-white text-sm hover:bg-gray-700 transition"
        >
          마이페이지
        </button>

        {/* 로그인 상태 */}
        {name ? (
          <>
            <span className="text-white text-sm hidden sm:block">
              {name}님 반갑습니다.
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 border border-gray-500 rounded-lg text-white text-sm hover:bg-gray-700 transition"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1.5 border border-gray-500 rounded-lg text-white text-sm hover:bg-gray-700 transition"
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-1.5 bg-pink-500 rounded-lg text-white text-sm hover:bg-pink-600 transition"
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;