import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  type?: "submit" | "button" | "reset";
}

const Button = ({ children }: IProps) => {
  return (
    <button
      className="flex items-center justify-center rounded-md
      font-medium text-white duration-300 disabled:bg-indigo-400
    disabled:hover:bg-indigo-400 disabled:cursor-not-allowed
    bg-slate-900 dark:bg-indigo-600 dark:text-white
    dark:hover:bg-indigo-700 p-3 w-full"
    >
      {children}
    </button>
  );
};

export default Button;
