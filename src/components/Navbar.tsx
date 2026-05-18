import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const nickname = localStorage.getItem("nickname");
  const [isOpen, setIsOpen] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("nickname");
      return true;
    },
    onSuccess: () => {
      alert("로그아웃 되었습니다.");
      navigate("/login");
      window.location.reload();
    },
  });

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-100">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-pink-600 text-xl">
            돌려돌려LP판
          </Link>

          <Link to="/" className="hover:text-pink-500">
            LP 목록
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {token ? (
            <>
              <span className="text-sm text-gray-700">
                {nickname ? `${nickname} 반갑습니다.` : "로그인됨"}
              </span>
              <Link to="/mypage" className="hover:text-pink-500">
                마이페이지
              </Link>
              <button onClick={() => setIsOpen(true)} className="hover:text-pink-500">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-pink-500">
                로그인
              </Link>
              <Link
                to="/signup"
                className="bg-pink-500 text-white px-3 py-2 rounded"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </nav>

      <ConfirmModal
        isOpen={isOpen}
        title="정말 로그아웃하시겠습니까?"
        onConfirm={() => logoutMutation.mutate()}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
}