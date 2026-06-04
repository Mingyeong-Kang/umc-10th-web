import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchMyInfo } from "../apis/user";
import { QUERY_KEY } from "../constants/key";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useUpdateProfileMutation = (onClose: () => void) => {
  const queryClient = useQueryClient();
  const { setAuth, accessToken } = useContext(AuthContext);

  return useMutation({
    mutationFn: patchMyInfo,

    // 💥 낙관적 업데이트 핵심
    onMutate: async (newData: any) => {
      const prevName = localStorage.getItem("name");

      // UI 즉시 반영
      if (accessToken) {
        setAuth(accessToken, newData.name);
      }

      return { prevName };
    },

    onError: (_err, _newData, context) => {
      // rollback
      if (context?.prevName && accessToken) {
        setAuth(accessToken, context.prevName);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.myInfo,
      });

      onClose();
    },
  });
};

export default useUpdateProfileMutation;