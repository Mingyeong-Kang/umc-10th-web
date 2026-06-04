import { useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useLp } from "../hooks/useLp";
import { useInfiniteComments } from "../hooks/useComments";
import { useAuth } from "../contexts/AuthContext";
import { deleteLp, likeLp, unlikeLp } from "../apis/lp";
import type { LpDetail } from "../types/lp";
import { ErrorState } from "../components/ErrorState";
import { CommentItem } from "../components/CommentItem";
import { CommentListSkeleton } from "../components/CommentSkeleton";
import { CommentForm } from "../components/CommentForm";
import { ConfirmModal } from "../components/ConfirmModal";
import { LpFormModal } from "../components/LpFormModal";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import type { SortOrder } from "../types/lp";

const formatDate = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
};

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const lpId = lpid ? Number(lpid) : undefined;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: lp, isPending, isError, refetch } = useLp(lpId);

  const [commentOrder, setCommentOrder] = useState<SortOrder>("desc");
  const {
    data: commentsData,
    isPending: isCommentsPending,
    isError: isCommentsError,
    refetch: refetchComments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteComments(lpId, commentOrder);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const triggerRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: handleIntersect,
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const isLiked = useMemo(
    () => !!user && !!lp?.likes?.some((l) => l.userId === user.id),
    [lp, user]
  );

  const likeMutation = useMutation<
    unknown,
    unknown,
    void,
    { previousLp: LpDetail | undefined }
  >({
    mutationFn: () =>
      isLiked ? unlikeLp(lp!.id) : likeLp(lp!.id),
    onMutate: async () => {
      if (!lp || !user) return { previousLp: undefined };
      const queryKey = ["lp", lp.id];
      await queryClient.cancelQueries({ queryKey });

      const previousLp = queryClient.getQueryData<LpDetail>(queryKey);

      queryClient.setQueryData<LpDetail>(queryKey, (old) => {
        if (!old) return old;
        const alreadyLiked = old.likes?.some((l) => l.userId === user.id);
        if (alreadyLiked) {
          return {
            ...old,
            likes: old.likes.filter((l) => l.userId !== user.id),
          };
        }
        return {
          ...old,
          likes: [
            ...(old.likes ?? []),
            { id: Date.now(), userId: user.id, lpId: old.id },
          ],
        };
      });

      return { previousLp };
    },
    onError: (err, _vars, context) => {
      if (context?.previousLp && lp) {
        queryClient.setQueryData(["lp", lp.id], context.previousLp);
      }
      const msg = axios.isAxiosError(err)
        ? (err.response?.data?.message ?? "요청에 실패했습니다.")
        : "요청에 실패했습니다.";
      alert(msg);
    },
    onSettled: () => {
      if (lp) {
        queryClient.invalidateQueries({ queryKey: ["lp", lp.id] });
        queryClient.invalidateQueries({ queryKey: ["lps"] });
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteLp(lp!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      setDeleteOpen(false);
      navigate("/", { replace: true });
    },
    onError: (err: unknown) => {
      const msg = axios.isAxiosError(err)
        ? (err.response?.data?.message ?? "LP 삭제에 실패했습니다.")
        : "LP 삭제에 실패했습니다.";
      alert(msg);
    },
  });

  if (isPending) {
    return (
      <div className="mx-auto max-w-3xl flex flex-col gap-4">
        <div className="h-8 w-2/3 rounded bg-gray-800 animate-pulse" />
        <div className="aspect-video w-full rounded bg-gray-800 animate-pulse" />
        <div className="h-4 w-1/3 rounded bg-gray-800 animate-pulse" />
        <div className="h-32 w-full rounded bg-gray-800 animate-pulse" />
      </div>
    );
  }

  if (isError || !lp) {
    return (
      <ErrorState
        message="LP 정보를 불러오지 못했습니다."
        onRetry={() => refetch()}
      />
    );
  }

  const comments = commentsData?.pages.flatMap((page) => page.data) ?? [];
  const isAuthor = user?.id === lp.authorId;

  return (
    <article className="mx-auto max-w-3xl flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-white">{lp.title}</h1>
          {isAuthor && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditOpen(true)}
                className="px-3 py-1 text-sm rounded border border-gray-600 text-gray-200 hover:bg-gray-800"
              >
                수정
              </button>
              <button
                type="button"
                onClick={() => setDeleteOpen(true)}
                className="px-3 py-1 text-sm rounded border border-red-500 text-red-400 hover:bg-red-500/10"
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-400">
          {lp.author?.name ?? "익명"} · {formatDate(lp.createdAt)}
        </p>
      </header>

      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full max-h-[480px] object-cover rounded"
      />

      <section className="text-gray-200 whitespace-pre-wrap leading-relaxed">
        {lp.content}
      </section>

      {lp.tags?.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {lp.tags.map((tag) => (
            <li
              key={tag.id}
              className="px-3 py-1 text-xs rounded-full bg-gray-800 text-gray-300"
            >
              #{tag.name}
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-center pt-4 border-t border-gray-800">
        <button
          type="button"
          onClick={() => {
            if (!user) {
              alert("로그인이 필요합니다.");
              return;
            }
            if (likeMutation.isPending) return;
            likeMutation.mutate();
          }}
          disabled={likeMutation.isPending}
          aria-pressed={isLiked}
          className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 hover:bg-gray-800 disabled:opacity-60 ${
            isLiked ? "text-pink-400" : "text-gray-300"
          }`}
        >
          <span className="text-xl">{isLiked ? "♥" : "♡"}</span>
          <span className="font-bold">{lp.likes?.length ?? 0}</span>
        </button>
      </div>

      <section className="flex flex-col gap-4 pt-6 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            댓글 {comments.length}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCommentOrder("desc")}
              className={`px-3 py-1 rounded text-xs ${
                commentOrder === "desc"
                  ? "bg-[#b2dab1] text-black font-bold"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              최신순
            </button>
            <button
              type="button"
              onClick={() => setCommentOrder("asc")}
              className={`px-3 py-1 rounded text-xs ${
                commentOrder === "asc"
                  ? "bg-[#b2dab1] text-black font-bold"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              오래된순
            </button>
          </div>
        </div>

        <CommentForm lpId={lp.id} />

        {isCommentsPending ? (
          <CommentListSkeleton count={5} />
        ) : isCommentsError ? (
          <ErrorState
            message="댓글을 불러오지 못했습니다."
            onRetry={() => refetchComments()}
          />
        ) : comments.length === 0 ? (
          <p className="text-center text-sm text-gray-500 py-6">
            아직 댓글이 없어요. 첫 댓글을 남겨보세요!
          </p>
        ) : (
          <ul className="flex flex-col">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} lpId={lp.id} />
            ))}
          </ul>
        )}

        {isFetchingNextPage && <CommentListSkeleton count={3} />}

        {hasNextPage && !isFetchingNextPage && (
          <div ref={triggerRef} className="h-8" aria-hidden />
        )}
      </section>

      <LpFormModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initialLp={lp}
      />
      <ConfirmModal
        open={deleteOpen}
        title="LP를 삭제할까요?"
        description="삭제한 LP는 복구할 수 없습니다."
        confirmLabel="삭제"
        destructive
        isLoading={deleteMutation.isPending}
        onConfirm={() => deleteMutation.mutate()}
        onCancel={() => setDeleteOpen(false)}
      />
    </article>
  );
};

export default LpDetailPage;
