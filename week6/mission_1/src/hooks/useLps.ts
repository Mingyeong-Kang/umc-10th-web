import { useQuery } from "@tanstack/react-query";
import { fetchLps } from "../apis/lp";
import type { SortOrder } from "../types/lp";

export const useLps = (sort: SortOrder) => {
  return useQuery({
    queryKey: ["lps", sort],
    queryFn: () => fetchLps({ order: sort, limit: 20 }),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
};
