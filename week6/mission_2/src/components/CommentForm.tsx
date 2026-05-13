import { useState } from "react";

export const CommentForm = () => {
  const [value, setValue] = useState("");
  const trimmed = value.trim();
  const isValid = trimmed.length > 0 && trimmed.length <= 200;

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
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
          disabled={!isValid}
          className="px-4 py-2 rounded bg-[#b2dab1] text-black font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          작성
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
