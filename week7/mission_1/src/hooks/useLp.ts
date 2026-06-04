import { useQuery } from "@tanstack/react-query";
import { fetchLp } from "../apis/lp";

export const useLp = (lpId: number | undefined) => {
  return useQuery({
    queryKey: ["lp", lpId],
    queryFn: () => fetchLp(lpId as number),
    enabled: typeof lpId === "number" && !Number.isNaN(lpId),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
};
