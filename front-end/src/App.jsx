import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {" "}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="App">
        <Outlet></Outlet>
        {/* Outlet is for rendering children inside Route */}
      </div>
    </>
  );
}

export default App;
