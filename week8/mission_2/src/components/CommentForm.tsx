import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createComment } from "../apis/comment";

interface Props {
  lpId: number;
}

export const CommentForm = ({ lpId }: Props) => {
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (content: string) => createComment(lpId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
      setValue("");
    },
    onError: (err: unknown) => {
      const msg = axios.isAxiosError(err)
        ? (err.response?.data?.message ?? "댓글 작성에 실패했습니다.")
        : "댓글 작성에 실패했습니다.";
      alert(msg);
    },
  });

  const trimmed = value.trim();
  const isValid = trimmed.length > 0 && trimmed.length <= 200;

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!isValid || mutation.isPending) return;
        mutation.mutate(trimmed);
      }}
    >
      <label htmlFor="comment-input" className="sr-only">
        댓글 입력
      </label>
      <div className="flex items-stretch gap-2">
        <input
          id="comment-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="댓글을 입력해주세요"
          maxLength={200}
          className="flex-1 px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#b2dab1]"
        />
        <button
          type="submit"
          disabled={!isValid || mutation.isPending}
          className="px-4 py-2 rounded bg-[#b2dab1] text-black font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "작성 중..." : "작성"}
        </button>
      </div>
      <p className="text-xs text-gray-500">
        {value.length === 0
          ? "1자 이상 200자 이하로 입력해주세요."
          : `${value.length}/200`}
      </p>
    </form>
  );
};
