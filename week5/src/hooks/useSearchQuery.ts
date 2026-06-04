import { useInfiniteQuery } from "@tanstack/react-query";

const getSearchList = async ({
  cursor,
  keyword,
}: {
  cursor: number;
  keyword: string;
}) => {
  const response = await fetch(
    `/api/search?q=${keyword}&cursor=${cursor}`
  );

  if (!response.ok) {
    throw new Error("검색 실패");
  }

  return response.json();
};

const useSearchQuery = (debouncedQuery: string) => {
  return useInfiniteQuery({
    queryKey: ["search", debouncedQuery],

    queryFn: ({ pageParam = 0 }) =>
      getSearchList({
        cursor: pageParam,
        keyword: debouncedQuery,
      }),

    initialPageParam: 0,

    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext
        ? lastPage.data.nextCursor
        : undefined,

    enabled: debouncedQuery.trim() !== "",

    staleTime: 1000 * 60,

    gcTime: 1000 * 60 * 5,
  });
};

export default useSearchQuery;