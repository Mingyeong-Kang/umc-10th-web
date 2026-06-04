import { useMutation } from "@tanstack/react-query";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
      localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
    },
  });
};

export default useLogoutMutation;