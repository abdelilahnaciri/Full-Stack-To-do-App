import Button from "./ui/Button";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Modal from "./ui/Modal";
import { ChangeEvent, FormEvent, useState } from "react";
import Input from "./ui/Input";
import { ITodo } from "../interfaces";
import Textarea from "./ui/Textarea";
import axiosInstance from "../config/axios.config";
import InputErrorMessage from "./ui/InputErrorMessage";
import TodoSkeleton from "./TodoSkeleton";
import { faker } from "@faker-js/faker";

const TodoList = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const [queryVersion, setQueryVersion] = useState(1);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenConfirmalModal, setOpenConfirmalModal] = useState(false);
  const [isOpenTodoAddModal, setOpenTodoAddModal] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<ITodo>({
    id: 0,
    title: "",
    description: "",
  });
  const [todoToAdd, setTodoToAdd] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState<{ title: string }>({
    title: "",
  });

  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: ["TodoList", `${queryVersion}`],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });
  // console.log({ isLoading, data });

  // ** Handlers
  const onCloseEditModal = () => {
    setTodoToEdit({
      id: 0,
      title: "",
      description: "",
    });
    setErrors({
      title: "",
    });
    setIsOpenEditModal(false);
  };
  const onOpenEditModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsOpenEditModal(true);
  };
  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setTodoToEdit({
      ...todoToEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    setIsUpdated(true);
    event.preventDefault();
    const { id, title, description } = todoToEdit;
    if (title.trim() === "") {
      setErrors({
        title: "Title is Required.",
      });
      setIsUpdated(false);
      return;
    }
    try {
      const { status } = await axiosInstance.put(
        `/todos/${id}`,
        { data: { title, description } },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      if (status === 200) {
        onCloseEditModal();
        setQueryVersion((prev) => prev + 1);
      }
      // console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdated(false);
    }
    // console.log(todoToEdit);
  };
  const onOpenConfirmalModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setOpenConfirmalModal(true);
  };
  const CloseConfirmalModal = () => {
    setTodoToEdit({
      id: 0,
      title: "",
      description: "",
    });
    setOpenConfirmalModal(false);
  };
  const onRemove = async () => {
    try {
      const { status } = await axiosInstance.delete(`/todos/${todoToEdit.id}`, {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      });
      if (status === 200) {
        CloseConfirmalModal();
        setQueryVersion((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const CloseTodoAddModal = () => {
    setTodoToAdd({
      title: "",
      description: "",
    });
    setErrors({
      title: "",
    });
    setOpenTodoAddModal(false);
  };
  const onChangeTodoAddHandler = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setTodoToAdd({
      ...todoToAdd,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onSubmitTodoToAddHandler = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    setIsUpdated(true);
    event.preventDefault();
    const { title, description } = todoToAdd;
    if (title.trim() === "") {
      setErrors({
        title: "Title is Required.",
      });
      setIsUpdated(false);
      return;
    }
    try {
      console.log(todoToAdd);
      const { status } = await axiosInstance.post(
        `/todos`,
        {
          data: {
            title,
            description,
            user: userData.user.id,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      if (status === 200) {
        CloseTodoAddModal();
        setQueryVersion((prev) => prev + 1);
      }
      // console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdated(false);
    }
    // console.log(todoToEdit);
  };
  const onGenerateTodos = async () => {
    for (let index = 0; index < 100; index++) {
      try {
        const { data } = await axiosInstance.post(
          `/todos`,
          {
            data: {
              title: faker.word.words(5),
              description: faker.lorem.paragraphs(2),
              user: userData.user.id,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${userData.jwt}`,
            },
          }
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoading)
    return (
      <div className="space-y-1">
        {Array.from({ length: 4 }).map((_, idx) => (
          <TodoSkeleton key={idx} />
        ))}
      </div>
    );
  return (
    <div className="space-y-1">
      <div className="w-fit mx-auto my-10">
        {isLoading ? (
          <div className="flex items-center space-x-2 animate-pulse">
            <div className="w-32 h-9 bg-gray-300 rounded-md dark:bg-gray-400"></div>
            <div className="w-32 h-9 bg-gray-300 rounded-md dark:bg-gray-400"></div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Button size={"sm"} onClick={() => setOpenTodoAddModal(true)}>
              Post New Todo
            </Button>
            <Button variant={"outline"} size={"sm"} onClick={onGenerateTodos}>
              Generate Todos
            </Button>
          </div>
        )}
      </div>
      {data.todos.length ? (
        data.todos.map((todo: ITodo, idx: number) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg=gray-100
            duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <p className="w-full font-semibold">
              {idx + 1} - {todo.title}
            </p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button
                variant={"default"}
                size={"sm"}
                onClick={() => onOpenEditModal(todo)}
              >
                Edit
              </Button>
              <Button
                variant={"danger"}
                size={"sm"}
                onClick={() => onOpenConfirmalModal(todo)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h3>No todos yet!</h3>
      )}

      {/* Edit Todo Modal */}
      <Modal
        isOpen={isOpenEditModal}
        closeModal={onCloseEditModal}
        title="Edit This Todo"
      >
        <form className="space-y-3" onSubmit={onSubmitHandler}>
          <Input
            name="title"
            type="text"
            placeholder="New Title..."
            value={todoToEdit.title}
            onChange={onChangeHandler}
          />
          {errors.title && <InputErrorMessage msg={errors.title} />}
          <Textarea
            name="description"
            placeholder="New Description..."
            value={todoToEdit.description}
            onChange={onChangeHandler}
          />
          <div className="flex items-center space-x-3 mt-4">
            <Button
              className="bg-indigo-700 hover:bg-indigo-800"
              isLoading={isUpdated}
            >
              Update
            </Button>
            <Button type="button" variant={"cancel"} onClick={onCloseEditModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Todo Confirm Modal */}
      <Modal
        isOpen={isOpenConfirmalModal}
        closeModal={CloseConfirmalModal}
        title="Are you sure you want to remove this Todo from your Todo List?"
        description="Deleting this todo will remove it permanently from your inventory. Any associated data, 
        and other related information will also be delted. Please make sure this is the intended
        action"
      >
        <div className="flex items-center space-x-3">
          <Button variant={"danger"} onClick={onRemove}>
            Yes, remove
          </Button>
          <Button variant={"cancel"} onClick={CloseConfirmalModal}>
            Cancel
          </Button>
        </div>
      </Modal>

      {/* Add New Todo Modal */}
      <Modal
        isOpen={isOpenTodoAddModal}
        closeModal={CloseTodoAddModal}
        title="Add New Todo"
      >
        <form className="space-y-3" onSubmit={onSubmitTodoToAddHandler}>
          <Input
            name="title"
            type="text"
            placeholder="New Title..."
            value={todoToAdd.title}
            onChange={onChangeTodoAddHandler}
          />
          {errors.title && <InputErrorMessage msg={errors.title} />}
          <Textarea
            name="description"
            placeholder="New Description..."
            value={todoToAdd.description}
            onChange={onChangeTodoAddHandler}
          />
          <div className="flex items-center space-x-3 mt-4">
            <Button
              className="bg-indigo-700 hover:bg-indigo-800"
              isLoading={isUpdated}
            >
              Done
            </Button>
            <Button
              type="button"
              variant={"cancel"}
              onClick={CloseTodoAddModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TodoList;
