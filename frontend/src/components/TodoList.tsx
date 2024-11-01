// import { useEffect, useState } from "react";
import Button from "./ui/Button";
import axiosInstance from "../config/axios.config";
import { useQuery } from "@tanstack/react-query";

const TodoList = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  // const [todos, setTodos] = useState([]);
  // useEffect(() => {
  //   try {
  //     axiosInstance
  //       .get("/users/me?populate=todos", {
  //         headers: {
  //           Authorization: `Bearer ${userData.jwt}`,
  //         },
  //       })
  //       .then((res) => setTodos(res.data.todos))
  //       .catch((err) => console.log("The Error: ", err));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [userData.jwt]);

  const { isLoading, data } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data: res } = await axiosInstance.get(
        "/users/me?populate=todos",
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      // console.log(res);
      return res;
    },
  });

  console.log({ isLoading, data });

  if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error... + {error.message}</p>;
  return (
    <div className="space-y-1">
      {data.todos.length ? (
        data.todos.map((todo, idx) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg=gray-100
  duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <p className="w-full font-semibold">
              {idx + 1} - {todo.title}
            </p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button>Edit</Button>
              <Button>Remove</Button>
            </div>
          </div>
        ))
      ) : (
        <h3>No todos yet!</h3>
        
      )}
    </div>
  );
};

export default TodoList;
