export const LpCardSkeleton = () => (
  <div className="aspect-square w-full overflow-hidden rounded bg-gray-800 relative">
    <div className="absolute inset-0 animate-pulse bg-gray-700/40" />
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  </div>
);

export const LpListSkeleton = ({ count = 12 }: { count?: number }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
    {Array.from({ length: count }).map((_, i) => (
      <LpCardSkeleton key={i} />
    ))}
  </div>
);
