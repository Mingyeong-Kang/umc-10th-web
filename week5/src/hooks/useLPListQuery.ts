import { useInfiniteQuery } from '@tanstack/react-query';
import { getLPList } from '../apis/lp';
import { PAGINATION_ORDER } from '../enums/common';

const useLPListQuery = (order: PAGINATION_ORDER) => {
  return useInfiniteQuery({
    queryKey: ['lps', order],
    queryFn: ({ pageParam = 0 }) => getLPList({
      cursor: pageParam,
      limit: 20,
      order,
    }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
};

export default useLPListQuery;