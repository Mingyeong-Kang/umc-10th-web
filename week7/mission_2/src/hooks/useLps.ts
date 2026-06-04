import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchLps } from "../apis/lp";
import type { SortOrder } from "../types/lp";

export const useInfiniteLps = (sort: SortOrder, limit = 20) => {
  return useInfiniteQuery({
    queryKey: ["lps", sort],
    queryFn: ({ pageParam }) =>
      fetchLps({ order: sort, limit, cursor: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
};
