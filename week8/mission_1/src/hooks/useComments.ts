import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchComments } from "../apis/comment";
import type { SortOrder } from "../types/lp";

export const useInfiniteComments = (
  lpId: number | undefined,
  order: SortOrder,
  limit = 10
) => {
  return useInfiniteQuery({
    queryKey: ["lpComments", lpId, order],
    enabled: lpId !== undefined,
    queryFn: ({ pageParam }) =>
      fetchComments({ lpId: lpId as number, order, limit, cursor: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
  });
};
