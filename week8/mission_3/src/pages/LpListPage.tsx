import { useCallback, useEffect, useState } from "react";
import { useInfiniteLps } from "../hooks/useLps";
import { useDebounce } from "../hooks/useDebounce";
import { useThrottle } from "../hooks/useThrottle";
import type { SortOrder } from "../types/lp";
import { LpCard } from "../components/LpCard";
import { LpListSkeleton } from "../components/LpCardSkeleton";
import { ErrorState } from "../components/ErrorState";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const LpListPage = () => {
  const [sort, setSort] = useState<SortOrder>("desc");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    console.log("[입력값]", search);
  }, [search]);

  useEffect(() => {
    console.log("[디바운스된 값]", debouncedSearch);
  }, [debouncedSearch]);

  const {
    data,
    isPending,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteLps({ sort, search: debouncedSearch });

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      console.log("[Throttled fetchNextPage] 호출", new Date().toISOString());
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const throttledIntersect = useThrottle(handleIntersect, 1000);

  const triggerRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: throttledIntersect,
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const lps = data?.pages.flatMap((page) => page.data) ?? [];
  const hasSearchQuery = debouncedSearch.trim().length > 0;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="LP 검색"
          className="w-full sm:max-w-xs px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b2dab1]"
        />
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
          {hasSearchQuery && lps.length === 0 && !isFetchingNextPage && (
            <p className="text-center text-sm text-gray-500 py-4">
              "{debouncedSearch}"에 해당하는 LP가 없습니다.
            </p>
          )}

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
