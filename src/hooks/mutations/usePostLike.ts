import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp.ts";
import { queryClient } from "../../App.tsx";
import { QUERY_KEY } from "../../constants/Key.ts";
import type {
  Likes,
  RequestLpDto,
  ResponseLikeLpDto,
  ResponseLpDto,
} from "../../types/lp.ts";
import type { ResponseMyInfoDto } from "../../types/auth.ts";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,

    // onMutate => API 요청 직전에 호출되는 친구
    // UI에 바로 변경을 보여주기 위해 Cache 업데이트
    onMutate: async (lp: RequestLpDto) => {
      // 1. 이 게시글에 관련된 쿼리를 취소
      // 기존 상세 데이터를 새로 불러오는 요청이 진행 중이면 잠깐 멈춤
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpId],
      });

      // 2. 현재 게시글의 데이터를 캐시에서 가져옴
      const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
        QUERY_KEY.lps,
        lp.lpId,
      ]);

      // 기존 데이터가 없으면 Optimistic Update 하지 않음
      if (!previousLpPost) {
        return { previousLpPost };
      }

      // 3. 이전 상태로 되돌릴 수 있도록 복사본 생성
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

      // 로그인 정보가 없으면 업데이트하지 않음
      if (!userId) {
        return { previousLpPost };
      }

      // 5. 이미 좋아요를 눌렀는지 확인
      const likedIndex = previousLpPost.data.likes.findIndex(
        (like: Likes) => like.userId === userId,
      );

      // 6. 좋아요가 없으면 추가
      if (likedIndex < 0) {
        const newLike = {
          id: Date.now(),
          userId,
          lpId: lp.lpId,
        } as Likes;

        newLpPost.data.likes.push(newLike);
      }

      // 7. 변경된 게시글 데이터를 캐시에 저장
      queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

      // 8. 실패했을 때 복구하기 위해 이전 데이터 반환
      return { previousLpPost };
    },

    // error => 요청 실패 시 발생
    onError: (_err, variables, context) => {
      // 실패하면 이전 캐시로 되돌림
      if (context?.previousLpPost) {
        queryClient.setQueryData(
          [QUERY_KEY.lps, variables.lpId],
          context.previousLpPost,
        );
      }
    },

    // onSettled => 성공/실패와 관계없이 API 요청이 끝나면 실행
    onSettled: async (_data, _error, variables) => {
      // 최종적으로 서버 데이터와 다시 동기화
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
      });
    },
  });
}

export default usePostLike;
