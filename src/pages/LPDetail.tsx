import { useParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { getLPComments, getLPDetail } from "../api/lp";

export default function LPDetail() {
  const { lpId } = useParams();
  const [order, setOrder] = useState<"latest" | "oldest">("latest");
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data: lp,
    isLoading: isLPDetailLoading,
    isError: isLPDetailError,
    error: lpError,
    refetch: refetchLPDetail,
  } = useQuery({
    queryKey: ["lp", lpId],
    queryFn: () => getLPDetail(Number(lpId)),
    enabled: !!lpId,
  });

  const {
    data: commentPages,
    isLoading: isCommentLoading,
    isError: isCommentError,
    error: commentError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchComments,
  } = useInfiniteQuery({
    queryKey: ["lpComments", lpId, order],
    queryFn: ({ pageParam = 1 }) =>
      getLPComments({
        lpId: Number(lpId),
        pageParam,
        order,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextPage : undefined,
    enabled: !!lpId,
  });

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLPDetailLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="h-8 w-40 bg-gray-300 animate-pulse rounded mb-4" />
        <div className="h-80 bg-gray-300 animate-pulse rounded mb-4" />
        <div className="h-5 w-3/4 bg-gray-300 animate-pulse rounded mb-2" />
        <div className="h-5 w-1/2 bg-gray-300 animate-pulse rounded" />
      </div>
    );
  }

  if (isLPDetailError || !lp) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <p className="mb-3">LP 상세 정보를 불러오지 못했습니다.</p>
        <p className="mb-3 text-sm text-red-500">
          {(lpError as Error)?.message || "알 수 없는 에러"}
        </p>
        <button
          onClick={() => refetchLPDetail()}
          className="border px-3 py-2 rounded"
        >
          다시 시도
        </button>
      </div>
    );
  }

  const allComments =
    commentPages?.pages.flatMap((page) => page.items ?? []) ?? [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 border rounded-xl p-6 bg-white shadow-sm">
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">
            {lp.author ?? "작성자 없음"}
          </p>
          <h1 className="text-3xl font-bold mb-2">{lp.title}</h1>
          <p className="text-sm text-gray-400">
            {lp.createdAt
              ? new Date(lp.createdAt).toLocaleString()
              : "작성일 없음"}
          </p>
        </div>

        {lp.thumbnail ? (
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-full max-w-md rounded shadow mb-4"
          />
        ) : (
          <div className="w-full max-w-md h-80 bg-gray-200 rounded mb-4 flex items-center justify-center">
            이미지 없음
          </div>
        )}

        <p className="mb-3">{lp.content ?? "설명 없음"}</p>

        <div className="flex gap-3 text-sm text-gray-500">
          <span>공개 여부: {lp.published ? "공개" : "비공개"}</span>
          <span>authorId: {lp.authorId ?? "없음"}</span>
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">댓글</h2>

          <div className="flex gap-2">
            <button
              onClick={() => setOrder("latest")}
              className={`px-3 py-1 rounded border ${
                order === "latest" ? "bg-black text-white" : ""
              }`}
            >
              최신순
            </button>
            <button
              onClick={() => setOrder("oldest")}
              className={`px-3 py-1 rounded border ${
                order === "oldest" ? "bg-black text-white" : ""
              }`}
            >
              오래된순
            </button>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="댓글을 입력해주세요"
            className="w-full border rounded px-3 py-2"
            disabled
          />
          <p className="text-sm text-gray-500 mt-2">
            댓글 입력 UI 자리만 구성한 상태입니다.
          </p>
        </div>

        {isCommentLoading && (
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 w-24 bg-gray-300 animate-pulse rounded mb-2" />
                  <div className="h-4 w-full bg-gray-300 animate-pulse rounded mb-2" />
                  <div className="h-4 w-2/3 bg-gray-300 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isCommentError && (
          <div className="mb-4">
            <p className="mb-2">댓글을 불러오지 못했습니다.</p>
            <p className="mb-2 text-sm text-red-500">
              {(commentError as Error)?.message || "알 수 없는 에러"}
            </p>
            <button
              onClick={() => refetchComments()}
              className="border px-3 py-2 rounded"
            >
              다시 시도
            </button>
          </div>
        )}

        {!isCommentLoading && !isCommentError && (
          <div className="space-y-4">
            {allComments.length === 0 ? (
              <div className="text-gray-500">댓글이 없습니다.</div>
            ) : (
              allComments.map((comment) => (
                <div key={comment.id} className="flex gap-3 border-b pb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                    {comment.authorName?.[0] ?? "U"}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">
                      {comment.authorName ?? "익명 사용자"}
                    </p>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {comment.createdAt
                        ? new Date(comment.createdAt).toLocaleString()
                        : ""}
                    </p>
                  </div>
                </div>
              ))
            )}

            <div ref={loadMoreRef} className="mt-4">
              {isFetchingNextPage ? (
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
                      <div className="flex-1">
                        <div className="h-4 w-24 bg-gray-300 animate-pulse rounded mb-2" />
                        <div className="h-4 w-full bg-gray-300 animate-pulse rounded mb-2" />
                        <div className="h-4 w-2/3 bg-gray-300 animate-pulse rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : hasNextPage ? (
                <div className="text-center text-gray-400 py-4">
                  더 불러오는 지점입니다.
                </div>
              ) : (
                <div className="text-center text-gray-400 py-4">
                  더 이상 댓글이 없습니다.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}