import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchLps } from "../apis/lp";
import type { SortOrder } from "../types/lp";

interface UseInfiniteLpsOptions {
  sort: SortOrder;
  search?: string;
  limit?: number;
}

export const useInfiniteLps = ({
  sort,
  search = "",
  limit = 20,
}: UseInfiniteLpsOptions) => {
  const trimmedSearch = search.trim();

  return useInfiniteQuery({
    queryKey: ["lps", sort, trimmedSearch],
    queryFn: ({ pageParam }) => {
      console.log("[API 호출] /lps", { sort, search: trimmedSearch, cursor: pageParam });
      return fetchLps({
        order: sort,
        limit,
        cursor: pageParam,
        ...(trimmedSearch && { search: trimmedSearch }),
      });
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
};
