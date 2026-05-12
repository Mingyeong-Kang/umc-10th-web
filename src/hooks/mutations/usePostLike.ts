import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLike } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/Key.ts";
import type { RequestLpDto, ResponseLikeLpDto } from "../../types/lp.ts";

function usePostLike() {
  const queryClient = useQueryClient();

  return useMutation<ResponseLikeLpDto, Error, RequestLpDto>({
    mutationFn: postLike,

    // data -> API 성공 응답 데이터
    // variables -> mutate에 전달한 값
    // context -> onMutate에서 반환한 값
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
      });
    },

    // error -> 요청 실패 시 발생한 에러
    // variables -> mutate에 전달한 값
    // context -> onMutate에서 반환한 값
    onError: () => {},

    // 요청 직전에 실행됨
    // Optimistic Update를 구현할 때 유용함
    onMutate: () => {
      console.log("hi");
    },

    // 요청이 끝난 후 항상 실행됨
    // onSuccess, onError 후에 실행됨
    // 로딩 상태를 초기화할 때 주로 유용함
    onSettled: () => {},
  });
}

export default usePostLike;
