import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { postSignin } from "../apis/auth";
import { AuthContext } from "../context/AuthContext";
import type { RequestSigninDto } from "../types/auth";

const useLoginMutation = () => {
  const { setAuth } = useContext(AuthContext);

  return useMutation({
    mutationFn: (data: RequestSigninDto) => postSignin(data),

    onSuccess: (res) => {
      const token = res.data.accessToken;
      const name = res.data.name;

      // 🔥 핵심: Context + localStorage 동기화
      setAuth(token, name);
    },
  });
};

export default useLoginMutation;