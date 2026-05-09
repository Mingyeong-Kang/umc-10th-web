import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const navigate = useNavigate();
  const { name, logout } = useContext(AuthContext);

  const navLinks = [
    { to: "/", label: "홈" },
    { to: "/movies/popular", label: "인기 영화" },
    { to: "/movies/now-playing", label: "현재 상영 중" },
    { to: "/movies/upcoming", label: "개봉 예정" },
    { to: "/movies/top-rated", label: "평점 높은" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-gray-900 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      {/* 왼쪽: 버거 버튼 + 로고 + 영화 링크 */}
      <div className="flex items-center gap-4">
        {/* 버거 버튼 */}
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
        <NavLink to="/" className="text-pink-500 font-bold text-xl shrink-0">
          🎵 돌려돌려LP판
        </NavLink>

        {/* 영화 링크 — 데스크탑에서만 표시 */}
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

      {/* 오른쪽: 로그인 상태 */}
      <div className="flex items-center gap-3">
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