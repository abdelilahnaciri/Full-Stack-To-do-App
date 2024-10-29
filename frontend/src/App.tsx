import { RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import router from "./router";

function App() {
  return (
    <RouterProvider router={router} />
    // <div>
    //   <Navbar />
    // </div>
  );
}

export default App;
