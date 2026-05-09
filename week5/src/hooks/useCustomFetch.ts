import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCustomFetch = <T,>(
  url: string,
  queryKey: unknown[]
) => {
  return useQuery({
    queryKey,

    queryFn: async ({ signal }) => {
      const res = await axios.get<T>(url, {
        signal,
      });

      return res.data;
    },

    retry: 3,

    retryDelay: (attemptIndex) =>
      Math.min(1000 * Math.pow(2, attemptIndex), 30000),

    staleTime: 5 * 60 * 1000,

    gcTime: 10 * 60 * 1000,

    enabled: !!url,
  });
};

export default useCustomFetch;