import { Link } from "react-router-dom";
import { HamburgerIcon } from "./HamburgerIcon";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: Props) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 px-4 py-3 bg-[#111111] border-b border-gray-800">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="text-white lg:hidden"
          aria-label="메뉴 열기"
        >
          <HamburgerIcon />
        </button>
        <Link to="/" className="text-xl font-bold text-[#b2dab1]">
          딴짓
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {isLoading ? null : isAuthenticated && user ? (
          <span className="text-sm text-white">
            <span className="text-[#b2dab1] font-bold">{user.name}</span>
            님 반갑습니다.
          </span>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-gray-300 hover:text-white"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="px-3 py-1 text-sm bg-[#b2dab1] text-black font-bold rounded"
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
