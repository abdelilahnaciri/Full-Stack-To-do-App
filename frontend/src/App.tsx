function App() {
  return (
    <div>
      <nav className="max-w-lg mx-auto mt-7 mb-20 px-3 py-5 rounded-md">
        <ul className="flex items-center justify-between">
          <li className="text-black duration-200 font-semibold text-lg">
            <a href="/">Home</a>
          </li>
          <p className="flex items-center space-x-3">
            <li className="text-black duration-200 font-semibold text-lg">
              <a href="/register">Register</a>
            </li>
            <li className="text-black duration-200 font-semibold text-lg">
              <a href="/login">Login</a>
            </li>
          </p>
        </ul>
      </nav>
      <div className="container">
        <div className="max-w-md mx-auto">
          <h2 className="text-center mb-4 text-3xl font-semibold">
            Login to get access!
          </h2>
          <form action="" className="space-y-4">
            <div>
              <input
                className="border-[1px] border-gray-300 shadow-lg
              focus:border-indigo-600 focus:outline-none focus:ring-1
              focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent"
                type="email"
                placeholder="Email"
                name="identifier"
              />
            </div>
            <div>
              <input
                className="border-[1px] border-gray-300 shadow-lg
              focus:border-indigo-600 focus:outline-none focus:ring-1
              focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent"
                type="password"
                placeholder="Password"
                name="password"
              />
            </div>
            <button
              className="flex items-center justify-center rounded-md
            font-medium text-white duration-300 disabled:bg-indigo-400
            disabled:hover:bg-indigo-400 disabled:cursor-not-allowed
            bg-slate-900 dark:bg-indigo-600 dark:text-white
            dark:hover:bg-indigo-700 p-3 w-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
