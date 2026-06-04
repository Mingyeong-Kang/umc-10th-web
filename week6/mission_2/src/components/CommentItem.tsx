import type { Comment } from "../types/lp";

const formatDateTime = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate()
  ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;
};

interface Props {
  comment: Comment;
}

export const CommentItem = ({ comment }: Props) => {
  const initial = comment.author?.name?.[0]?.toUpperCase() ?? "?";

  return (
    <li className="flex items-start gap-3 py-4 border-b border-gray-800">
      <div className="size-9 shrink-0 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold text-white">
        {comment.author?.avatar ? (
          <img
            src={comment.author.avatar}
            alt={comment.author.name}
            className="size-full rounded-full object-cover"
          />
        ) : (
          initial
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-bold text-white">
            {comment.author?.name ?? "익명"}
          </span>
          <span className="text-gray-500 text-xs">
            {formatDateTime(comment.createdAt)}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-200 whitespace-pre-wrap break-words">
          {comment.content}
        </p>
      </div>
    </li>
  );
};
