import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Paginator from "../components/ui/Paginator";
import { useState } from "react";

const TodosPage = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const [page, setPage] = useState<number>(1);

  const { isLoading, data, isFetching } = useAuthenticatedQuery({
    queryKey: [`todo-page-${page}`],
    url: `/todos?pagination[pageSize]=25&pagination[page]=${page}`,
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });
  console.log(data);
  if (isLoading)
    return (
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse p-5 rounded-md even:bg-gray-200"
          >
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          </div>
        ))}
      </div>
    );

  // ** Handlers
  const onClickPrev = () => {
    setPage((prev) => prev - 1);
  };
  const onClickNext = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="my-20 space-y-6">
      {data.data.length ? (
        data.data.map(
          (
            { id, attributes }: { id: number; attributes: { title: string } },
            idx: number
          ) => (
            <div
              key={id}
              className="flex items-center justify-between hover:bg=gray-100
            duration-300 p-3 rounded-md even:bg-gray-100"
            >
              <h3 className="w-full font-semibold">
                {idx + 1} - {attributes.title}
              </h3>
            </div>
          )
        )
      ) : (
        <h3>No todos yet!</h3>
      )}
      <Paginator
        page={page}
        pageCount={data.meta.pagination.pageCount}
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
        total={data.meta.pagination.total}
        isLoading={isLoading || isFetching}
      />
    </div>
  );
};

export default TodosPage;
