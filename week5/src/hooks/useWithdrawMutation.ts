import { useMutation } from "@tanstack/react-query";
import { deleteMyAccount } from "../apis/auth";

const useWithdrawMutation = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: deleteMyAccount,

    onSuccess: () => {
      localStorage.clear();

      onSuccess?.();
    },
  });
};

export default useWithdrawMutation;