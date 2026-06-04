import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLP } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";
import { useNavigate } from "react-router-dom";

const useDeleteLPMutation = (lpId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteLP(lpId),

    onSuccess: () => {
      // 목록 갱신
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.lps,
      });

      // 상세 캐시 삭제
      queryClient.removeQueries({
        queryKey: QUERY_KEY.lpDetail(lpId),
      });

      // 목록으로 이동
      navigate("/lps");
    },
  });
};

export default useDeleteLPMutation;