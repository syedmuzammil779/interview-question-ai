export const SkeletonLoader = () => {
  return (
    <div className="mt-6 flex flex-col gap-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 bg-gray-200 rounded-sm">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
          <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  );
};
