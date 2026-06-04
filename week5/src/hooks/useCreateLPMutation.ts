import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLP } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";
import type { CreateLPVariables } from "../types/common";

const useCreateLPMutation = (onClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ request }: CreateLPVariables) =>
      postLP(request),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.lps,
      });

      onClose();
    },
  });
};

export default useCreateLPMutation;