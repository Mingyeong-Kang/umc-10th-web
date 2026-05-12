import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Comment } from "../types/lp";
import { useAuth } from "../contexts/AuthContext";
import { deleteComment, updateComment } from "../apis/comment";
import { ConfirmModal } from "./ConfirmModal";

const formatDateTime = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate()
  ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;
};

interface Props {
  comment: Comment;
  lpId: number;
}

export const CommentItem = ({ comment, lpId }: Props) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const isMine = user?.id === comment.authorId;

  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });

  const handleError = (err: unknown, fallback: string) => {
    const msg = axios.isAxiosError(err)
      ? (err.response?.data?.message ?? fallback)
      : fallback;
    alert(msg);
  };

  const updateMutation = useMutation({
    mutationFn: (content: string) => updateComment(lpId, comment.id, content),
    onSuccess: () => {
      invalidate();
      setIsEditing(false);
    },
    onError: (err) => handleError(err, "댓글 수정에 실패했습니다."),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteComment(lpId, comment.id),
    onSuccess: () => {
      invalidate();
      setConfirmDeleteOpen(false);
    },
    onError: (err) => handleError(err, "댓글 삭제에 실패했습니다."),
  });

  const initial = comment.author?.name?.[0]?.toUpperCase() ?? "?";
  const trimmedEdit = editValue.trim();
  const isEditValid =
    trimmedEdit.length > 0 &&
    trimmedEdit.length <= 200 &&
    trimmedEdit !== comment.content.trim();

  return (
    <li className="flex items-start gap-3 py-4 border-b border-gray-800">
      <div className="size-9 shrink-0 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold text-white">
        {comment.author?.avatar ? (
          <img
            src={comment.author.avatar}
            alt={comment.author.name}
            className="size-full rounded-full object-cover"
          />
        ) : (
          initial
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold text-white">
              {comment.author?.name ?? "익명"}
            </span>
            <span className="text-gray-500 text-xs">
              {formatDateTime(comment.createdAt)}
            </span>
          </div>
          {isMine && !isEditing && (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                aria-label="댓글 메뉴"
                onClick={() => setMenuOpen((v) => !v)}
                className="px-2 text-gray-400 hover:text-white text-sm leading-none"
              >
                ⋯
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-1 w-24 rounded bg-[#1c1c1c] border border-gray-700 shadow-lg z-10">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setIsEditing(true);
                      setEditValue(comment.content);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-800"
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setConfirmDeleteOpen(true);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-800"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {isEditing ? (
          <form
            className="mt-2 flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!isEditValid || updateMutation.isPending) return;
              updateMutation.mutate(trimmedEdit);
            }}
          >
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              maxLength={200}
              autoFocus
              className="px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#b2dab1] text-sm"
            />
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={!isEditValid || updateMutation.isPending}
                className="px-3 py-1 rounded bg-[#b2dab1] text-black font-bold text-xs disabled:opacity-50"
              >
                {updateMutation.isPending ? "저장 중..." : "저장"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditValue(comment.content);
                }}
                className="px-3 py-1 rounded border border-gray-600 text-gray-300 text-xs"
              >
                취소
              </button>
            </div>
          </form>
        ) : (
          <p className="mt-1 text-sm text-gray-200 whitespace-pre-wrap break-words">
            {comment.content}
          </p>
        )}
      </div>

      <ConfirmModal
        open={confirmDeleteOpen}
        title="댓글을 삭제할까요?"
        description="삭제한 댓글은 복구할 수 없습니다."
        confirmLabel="삭제"
        destructive
        isLoading={deleteMutation.isPending}
        onConfirm={() => deleteMutation.mutate()}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </li>
  );
};
