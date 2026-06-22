import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe } from "../api/user";
import { updateNicknameMutation } from "../api/mutations";
import type { Me } from "../types/lp";

export default function MyPage() {
  const queryClient = useQueryClient();
  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const [nickname, setNickname] = useState(me?.nickname ?? "");

  const updateNickname = useMutation({
    mutationFn: updateNicknameMutation,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["me"] });

      const previousMe = queryClient.getQueryData<Me | null>(["me"]);

      if (previousMe) {
        queryClient.setQueryData(["me"], {
          ...previousMe,
          nickname: variables.nickname,
        });
      }

      return { previousMe };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousMe) {
        queryClient.setQueryData(["me"], context.previousMe);
      }
      alert("닉네임 변경 실패");
    },
    onSuccess: () => {
      alert("닉네임 변경 성공");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["lps"] });
    },
  });

  if (!me) {
    return <div className="p-6">로그인이 필요합니다.</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">마이페이지</h1>

      <div className="border rounded-xl p-6 bg-white shadow-sm">
        <p className="mb-2">이메일: {me.email}</p>
        <p className="mb-4">현재 닉네임: {me.nickname}</p>

        <div className="flex gap-2">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="border p-2 rounded flex-1"
            placeholder="새 닉네임"
          />
          <button
            onClick={() => updateNickname.mutate({ nickname })}
            className="bg-pink-500 text-white px-4 py-2 rounded"
            disabled={updateNickname.isPending}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}