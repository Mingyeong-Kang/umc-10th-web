import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe } from "../api/user";
import { logoutMutation } from "../api/mutations";

export default function Navbar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const amount = useCartStore((state) => state.amount);

  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const logout = useMutation({
    mutationFn: logoutMutation,
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
      alert("로그아웃 되었습니다.");
      navigate("/");
    },
  });

  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-white">
      <div className="mx-auto flex h-full items-center justify-between px-4 md:px-6">
        <Link to="/" className="font-bold text-pink-600 text-xl">
          돌려돌려LP판
        </Link>

        <div className="flex items-center gap-3">
          {/* 플레이리스트 장바구니 링크 */}
          <NavLink
            to="/playlist"
            className={({ isActive }) =>
              `relative flex items-center gap-1 text-sm transition ${
                isActive ? "text-pink-600 font-semibold" : "text-gray-600 hover:text-pink-500"
              }`
            }
          >
            🎵
            {amount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white">
                {amount}
              </span>
            )}
          </NavLink>

          {me ? (
            <>
              <span className="hidden text-sm text-gray-700 md:block">
                {me.nickname} 반갑습니다.
              </span>
              <Link to="/mypage" className="text-sm hover:text-pink-500">
                마이페이지
              </Link>
              <button
                onClick={() => logout.mutate()}
                className="text-sm hover:text-pink-500"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm hover:text-pink-500">
                로그인
              </Link>
              <Link
                to="/signup"
                className="rounded bg-pink-500 px-3 py-2 text-sm text-white"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}