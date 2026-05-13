import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useLp } from "../hooks/useLp";
import { useInfiniteComments } from "../hooks/useComments";
import { ErrorState } from "../components/ErrorState";
import { CommentItem } from "../components/CommentItem";
import { CommentListSkeleton } from "../components/CommentSkeleton";
import { CommentForm } from "../components/CommentForm";
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

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const triggerRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: handleIntersect,
    enabled: hasNextPage && !isFetchingNextPage,
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

  return (
    <article className="mx-auto max-w-3xl flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-white">{lp.title}</h1>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-3 py-1 text-sm rounded border border-gray-600 text-gray-200 hover:bg-gray-800"
            >
              수정
            </button>
            <button
              type="button"
              className="px-3 py-1 text-sm rounded border border-red-500 text-red-400 hover:bg-red-500/10"
            >
              삭제
            </button>
          </div>
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
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 hover:bg-gray-800 text-pink-400"
        >
          <span className="text-xl">♥</span>
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

        <CommentForm />

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
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </ul>
        )}

        {isFetchingNextPage && <CommentListSkeleton count={3} />}

        {hasNextPage && !isFetchingNextPage && (
          <div ref={triggerRef} className="h-8" aria-hidden />
        )}
      </section>
    </article>
  );
};

export default LpDetailPage;
