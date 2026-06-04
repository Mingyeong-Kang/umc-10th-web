import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { withdraw } from "../apis/auth";
import { ConfirmModal } from "./ConfirmModal";

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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [withdrawOpen, setWithdrawOpen] = useState(false);

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

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      queryClient.clear();
      onClose();
      navigate("/");
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: withdraw,
    onSuccess: async () => {
      await logout();
      queryClient.clear();
      setWithdrawOpen(false);
      onClose();
      navigate("/login", { replace: true });
    },
    onError: (err: unknown) => {
      const msg = axios.isAxiosError(err)
        ? (err.response?.data?.message ?? "탈퇴 처리에 실패했습니다.")
        : "탈퇴 처리에 실패했습니다.";
      alert(msg);
    },
  });

  return (
    <>
      <div
        aria-hidden
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        ref={sidebarRef}
        className={`fixed lg:sticky top-0 left-0 h-screen w-60 bg-[#111111] border-r border-gray-800 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
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
            <>
              <button
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="mt-3 px-3 py-2 text-left text-gray-400 hover:bg-gray-800 rounded disabled:opacity-50"
              >
                {logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
              </button>
              <button
                onClick={() => setWithdrawOpen(true)}
                className="px-3 py-2 text-left text-red-400 hover:bg-gray-800 rounded"
              >
                탈퇴하기
              </button>
            </>
          )}
        </div>
      </aside>

      <ConfirmModal
        open={withdrawOpen}
        title="정말 탈퇴하시겠습니까?"
        description={
          "탈퇴 시 회원님의 모든 게시글, 댓글, 좋아요 정보가\n영구적으로 삭제됩니다."
        }
        confirmLabel="예"
        cancelLabel="아니오"
        destructive
        isLoading={withdrawMutation.isPending}
        onConfirm={() => withdrawMutation.mutate()}
        onCancel={() => setWithdrawOpen(false)}
      />
    </>
  );
};
