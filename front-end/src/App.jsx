import { useState } from "react";

import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Outlet></Outlet>
      {/* Outlet is for rendering children inside Route */}
    </div>
  );
}

export default App;
