import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/Key.ts";
import type { RequestLpDto, ResponseLikeLpDto } from "../../types/lp.ts";

function useDeleteLike() {
  const queryClient = useQueryClient();

  return useMutation<ResponseLikeLpDto, Error, RequestLpDto>({
    mutationFn: deleteLike,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
      });
    },
  });
}

export default useDeleteLike;
