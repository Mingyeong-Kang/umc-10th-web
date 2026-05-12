export const LpCardSkeleton = () => (
  <div className="aspect-square w-full rounded bg-gray-800 animate-pulse" />
);

export const LpListSkeleton = ({ count = 12 }: { count?: number }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
    {Array.from({ length: count }).map((_, i) => (
      <LpCardSkeleton key={i} />
    ))}
  </div>
);
