import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchComment } from "../apis/comment";
import { QUERY_KEY } from "../constants/key";

const useUpdateCommentMutation = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => patchComment({ commentId, content }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.lpComments(lpId),
      });
    },
  });
};

export default useUpdateCommentMutation;