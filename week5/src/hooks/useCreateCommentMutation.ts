import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../apis/comment";
import { QUERY_KEY } from "../constants/key";

const useCreateCommentMutation = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      postComment({
        lpId,
        content,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.lpComments(lpId),
      });
    },
  });
};

export default useCreateCommentMutation;