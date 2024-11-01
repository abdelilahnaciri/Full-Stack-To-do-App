import toast from "react-hot-toast";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const { pathname } = useLocation();
  const onLogout = () => {
    localStorage.removeItem(storageKey);
    toast.success("You will logout after 2 seconds.", {
      position: "bottom-center",
      duration: 1500,
      style: {
        backgroundColor: "black",
        color: "white",
        width: "fit-content",
      },
    });
    setTimeout(() => {
      location.replace(pathname);
    }, 1500);
  };

  return (
    <nav className="max-w-lg mx-auto mt-7 mb-20 bg-indigo-600 px-3 py-5 rounded-md">
      <ul className="flex items-center justify-between">
        <li className="text-white duration-200 font-semibold text-lg">
          <NavLink to="/">Home</NavLink>
        </li>
        {userData ? (
          <div className="text-white flex items-center space-x-3">
            <span>Email:{userData.user.email}</span>
            <span
              className="font-semibold text-lg cursor-pointer"
              onClick={onLogout}
            >
              Logout
            </span>
          </div>
        ) : (
          <p className="text-white flex items-center space-x-3">
            <li className=" duration-200 font-semibold text-lg">
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className="duration-200 font-semibold text-lg">
              <NavLink to="/login">Login</NavLink>
            </li>
          </p>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
