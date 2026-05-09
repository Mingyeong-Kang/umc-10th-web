import { useInfiniteQuery } from "@tanstack/react-query";
import { getLPComments } from "../apis/lp";
import { PAGINATION_ORDER } from "../enums/common";

const useLPCommentsQuery = (lpId: number, order: PAGINATION_ORDER) => {
  return useInfiniteQuery({
    queryKey: ["lpComments", lpId, order],
    queryFn: ({ pageParam = 0 }) =>
      getLPComments(lpId, {
        cursor: pageParam,
        limit: 10,
        order,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    enabled: !!lpId,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
};

export default useLPCommentsQuery;