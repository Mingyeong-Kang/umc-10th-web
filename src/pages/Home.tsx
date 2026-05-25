import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getLPList } from "../api/lp";
import { createLPMutation } from "../api/mutations";
import LPCreateModal from "../components/LPCreateModal";
import useDebounce from "../hooks/useDebounce";

type SortType = "latest" | "oldest";

export default function Home() {
  const [sort, setSort] = useState<SortType>("latest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const debouncedKeyword = useDebounce(searchInput, 500);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

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
    queryKey: ["lps", sort, debouncedKeyword],
    queryFn: ({ pageParam = 1 }) =>
      getLPList({
        pageParam,
        sort,
        keyword: debouncedKeyword,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextPage : undefined,
  });

  const createLP = useMutation({
    mutationFn: createLPMutation,
    onSuccess: () => {
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      alert("LP 생성 성공");
    },
    onError: (error: Error) => {
      alert(error.message || "LP 생성 실패");
    },
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
      <LPCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(input) => createLP.mutate(input)}
        isPending={createLP.isPending}
      />

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">LP 목록</h1>

        <div className="flex flex-col gap-3 md:w-[480px]">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="LP 제목, 작성자, 내용, 태그 검색"
            className="w-full rounded border px-3 py-2"
          />
          <p className="text-xs text-gray-500">
            검색 입력은 debounce 500ms 적용 상태입니다.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSort("oldest")}
            className={`rounded border px-3 py-2 ${
              sort === "oldest" ? "bg-black text-white" : ""
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setSort("latest")}
            className={`rounded border px-3 py-2 ${
              sort === "latest" ? "bg-black text-white" : ""
            }`}
          >
            최신순
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-lg border bg-white shadow-sm"
            >
              <div className="h-56 animate-pulse bg-gray-300" />
              <div className="p-3">
                <div className="mb-2 h-5 animate-pulse rounded bg-gray-300" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-300" />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="py-20 text-center">
          <p className="mb-3">LP 목록을 불러오지 못했습니다.</p>
          <p className="mb-3 text-sm text-red-500">
            {(error as Error)?.message || "알 수 없는 에러"}
          </p>
          <button onClick={() => refetch()} className="rounded border px-3 py-2">
            다시 시도
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {items.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              검색 결과가 없습니다.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {items.map((lp) => (
                <Link
                  key={lp.id}
                  to={`/lp/${lp.id}`}
                  className="overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="flex h-56 items-center justify-center overflow-hidden bg-gray-100">
                    {lp.thumbnail ? (
                      <img
                        src={lp.thumbnail}
                        alt={lp.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">이미지 없음</span>
                    )}
                  </div>

                  <div className="p-3">
                    <p className="line-clamp-1 font-semibold">{lp.title}</p>
                    <p className="line-clamp-1 text-sm text-gray-500">
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
              className="mt-6 flex h-20 items-center justify-center"
            >
              {isFetchingNextPage ? (
                <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="overflow-hidden rounded-lg border bg-white shadow-sm"
                    >
                      <div className="h-56 animate-pulse bg-gray-300" />
                      <div className="p-3">
                        <div className="mb-2 h-5 animate-pulse rounded bg-gray-300" />
                        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-300" />
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

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-pink-500 text-2xl text-white shadow-lg"
      >
        +
      </button>
    </div>
  );
}