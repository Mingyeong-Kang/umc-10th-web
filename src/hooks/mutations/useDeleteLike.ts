import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp.ts";
import { queryClient } from "../../App.tsx";
import { QUERY_KEY } from "../../constants/Key.ts";
import type {
  Likes,
  RequestLpDto,
  ResponseLikeLpDto,
  ResponseLpDto,
} from "../../types/lp.ts";
import type { ResponseMyInfoDto } from "../../types/auth.ts";

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,

    // onMutate => API 요청 직전에 호출되는 친구
    // UI에 바로 변경을 보여주기 위해 Cache 업데이트
    onMutate: async (lp: RequestLpDto) => {
      // 1. 이 게시글에 관련된 쿼리를 취소
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpId],
      });

      // 2. 현재 게시글의 데이터를 캐시에서 가져옴
      const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
        QUERY_KEY.lps,
        lp.lpId,
      ]);

      if (!previousLpPost) {
        return { previousLpPost };
      }

      // 3. 게시글 데이터를 복사해서 새 객체 생성
      const newLpPost: ResponseLpDto = {
        ...previousLpPost,
        data: {
          ...previousLpPost.data,
          likes: [...previousLpPost.data.likes],
        },
      };

      // 4. 현재 로그인한 내 정보 가져오기
      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);

      const userId = Number(me?.data.id);

      if (!userId) {
        return { previousLpPost };
      }

      // 5. 현재 내가 누른 좋아요 위치 찾기
      const likedIndex = newLpPost.data.likes.findIndex(
        (like: Likes) => like.userId === userId,
      );

      // 6. 좋아요가 있으면 제거
      if (likedIndex >= 0) {
        newLpPost.data.likes.splice(likedIndex, 1);
      }

      // 7. 업데이트된 게시글 데이터를 캐시에 저장
      queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

      // 8. 실패 시 되돌리기 위해 이전 데이터 반환
      return { previousLpPost };
    },

    // error => 요청 실패 시 발생
    onError: (_err, variables, context) => {
      if (context?.previousLpPost) {
        queryClient.setQueryData(
          [QUERY_KEY.lps, variables.lpId],
          context.previousLpPost,
        );
      }
    },

    // onSettled => API 요청이 끝난 후 실행
    onSettled: async (_data, _error, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
      });
    },
  });
}

export default useDeleteLike;
