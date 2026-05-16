import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLike, deleteLike } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";

const useToggleLikeMutation = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (isLiked: boolean) => {
      if (isLiked) {
        return deleteLike(lpId);
      }

      return postLike(lpId);
    },

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEY.lpDetail(lpId),
      });

      const prev = queryClient.getQueryData(
        QUERY_KEY.lpDetail(lpId)
      );

      const accessToken =
        localStorage.getItem("accessToken");

      let myId: number | null = null;

      if (accessToken) {
        const payload = JSON.parse(
          atob(accessToken.split(".")[1])
        );

        myId = payload.sub;
      }

      let isLiked = false;

      queryClient.setQueryData(
        QUERY_KEY.lpDetail(lpId),
        (old: any) => {
          if (!old || !myId) return old;

          isLiked = old.data.likes.some(
            (like: any) => like.userId === myId
          );

          return {
            ...old,
            data: {
              ...old.data,
              likes: isLiked
                ? old.data.likes.filter(
                    (like: any) =>
                      like.userId !== myId
                  )
                : [
                    ...old.data.likes,
                    {
                      id: Date.now(),
                      userId: myId,
                      lpId,
                    },
                  ],
            },
          };
        }
      );

      return { prev, isLiked };
    },

    onError: (_err, _vars, context) => {
      if (context?.prev) {
        queryClient.setQueryData(
          QUERY_KEY.lpDetail(lpId),
          context.prev
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.lpDetail(lpId),
      });
    },
  });
};

export default useToggleLikeMutation;

