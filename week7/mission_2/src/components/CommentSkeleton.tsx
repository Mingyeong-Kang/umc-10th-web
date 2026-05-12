export const CommentSkeleton = () => (
  <div className="flex items-start gap-3 py-3 border-b border-gray-800">
    <div className="size-9 rounded-full bg-gray-800 animate-pulse" />
    <div className="flex-1 flex flex-col gap-2">
      <div className="h-3 w-24 rounded bg-gray-800 animate-pulse" />
      <div className="h-3 w-full rounded bg-gray-800 animate-pulse" />
      <div className="h-3 w-2/3 rounded bg-gray-800 animate-pulse" />
    </div>
  </div>
);

export const CommentListSkeleton = ({ count = 5 }: { count?: number }) => (
  <div className="flex flex-col">
    {Array.from({ length: count }).map((_, i) => (
      <CommentSkeleton key={i} />
    ))}
  </div>
);
