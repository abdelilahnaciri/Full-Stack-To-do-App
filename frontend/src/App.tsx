import { RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import router from "./router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <main>
      <RouterProvider router={router} />
      <Toaster />
    </main>
    // <div>
    //   <Navbar />
    // </div>
  );
}

export default App;
