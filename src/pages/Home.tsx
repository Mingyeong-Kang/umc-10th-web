import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getLPList } from "../api/lp";

type SortType = "latest" | "oldest";

export default function Home() {
  const [sort, setSort] = useState<SortType>("latest");
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["lps", sort],
    queryFn: ({ pageParam = 1 }) =>
      getLPList({
        pageParam,
        sort,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextPage : undefined,
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

  const items = data?.pages.flatMap((page) => page.items ?? []) ?? [];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">LP 목록</h1>

        <div className="flex gap-2">
          <button
            onClick={() => setSort("oldest")}
            className={`px-3 py-2 rounded border ${
              sort === "oldest" ? "bg-black text-white" : ""
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setSort("latest")}
            className={`px-3 py-2 rounded border ${
              sort === "latest" ? "bg-black text-white" : ""
            }`}
          >
            최신순
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-lg overflow-hidden border shadow-sm bg-white"
            >
              <div className="h-56 bg-gray-300 animate-pulse" />
              <div className="p-3">
                <div className="h-5 bg-gray-300 animate-pulse rounded mb-2" />
                <div className="h-4 bg-gray-300 animate-pulse rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="text-center py-20">
          <p className="mb-3">LP 목록을 불러오지 못했습니다.</p>
          <p className="mb-3 text-sm text-red-500">
            {(error as Error)?.message || "알 수 없는 에러"}
          </p>
          <button
            onClick={() => refetch()}
            className="border px-3 py-2 rounded"
          >
            다시 시도
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {items.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              등록된 LP가 없습니다.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {items.map((lp) => (
                <Link
                  key={lp.id}
                  to={`/lp/${lp.id}`}
                  className="rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition bg-white"
                >
                  <div className="h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {lp.thumbnail ? (
                      <img
                        src={lp.thumbnail}
                        alt={lp.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">이미지 없음</span>
                    )}
                  </div>

                  <div className="p-3">
                    <p className="font-semibold line-clamp-1">{lp.title}</p>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {lp.author ?? "작성자 없음"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div
              ref={loadMoreRef}
              className="h-20 flex items-center justify-center mt-6"
            >
              {isFetchingNextPage ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg overflow-hidden border shadow-sm bg-white"
                    >
                      <div className="h-56 bg-gray-300 animate-pulse" />
                      <div className="p-3">
                        <div className="h-5 bg-gray-300 animate-pulse rounded mb-2" />
                        <div className="h-4 bg-gray-300 animate-pulse rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : hasNextPage ? (
                <span className="text-gray-400">더 불러오는 지점입니다.</span>
              ) : (
                <span className="text-gray-400">더 이상 데이터가 없습니다.</span>
              )}
            </div>
          )}
        </>
      )}

      <button className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-pink-500 text-white text-2xl shadow-lg">
        +
      </button>
    </div>
  );
}