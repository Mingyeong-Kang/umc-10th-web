const LpCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg animate-pulse">
      <div className="h-48 w-full bg-gray-300" />

      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2">
        <div className="h-4 w-3/4 rounded-sm bg-gray-400" />
      </div>
    </div>
  );
};

export default LpCardSkeleton;
