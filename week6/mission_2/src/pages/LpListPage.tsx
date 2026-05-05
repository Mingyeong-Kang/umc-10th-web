import { useState, useCallback } from "react";
import { useInfiniteLps } from "../hooks/useLps";
import type { SortOrder } from "../types/lp";
import { LpCard } from "../components/LpCard";
import { LpListSkeleton } from "../components/LpCardSkeleton";
import { ErrorState } from "../components/ErrorState";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const LpListPage = () => {
  const [sort, setSort] = useState<SortOrder>("desc");
  const {
    data,
    isPending,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteLps(sort);

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const triggerRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: handleIntersect,
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const lps = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setSort("desc")}
          className={`px-3 py-1 rounded text-sm ${
            sort === "desc"
              ? "bg-[#b2dab1] text-black font-bold"
              : "bg-gray-800 text-gray-300"
          }`}
        >
          최신순
        </button>
        <button
          type="button"
          onClick={() => setSort("asc")}
          className={`px-3 py-1 rounded text-sm ${
            sort === "asc"
              ? "bg-[#b2dab1] text-black font-bold"
              : "bg-gray-800 text-gray-300"
          }`}
        >
          오래된순
        </button>
      </div>

      {isPending ? (
        <LpListSkeleton count={15} />
      ) : isError ? (
        <ErrorState
          message="LP 목록을 불러오지 못했습니다."
          onRetry={() => refetch()}
        />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {lps.map((lp) => (
              <LpCard key={lp.id} lp={lp} />
            ))}
          </div>

          {isFetchingNextPage && <LpListSkeleton count={10} />}

          {hasNextPage && !isFetchingNextPage && (
            <div ref={triggerRef} className="h-10" aria-hidden />
          )}

          {!hasNextPage && lps.length > 0 && (
            <p className="text-center text-sm text-gray-500 py-4">
              마지막 LP까지 모두 보셨어요.
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default LpListPage;
