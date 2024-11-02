const TodoSkeleton = () => {
  return (
    <div className="flex items-center justify-between animate-pulse p-3 rounded-md even:bg-gray-200">
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>

      <div className="flex items-center justify-end space-x-3">
        <div className="h-9 w-14 bg-gray-300 rounded-md dark:bg-gray-700"></div>
        <div className="h-9 w-20 bg-gray-300 rounded-md dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default TodoSkeleton;
