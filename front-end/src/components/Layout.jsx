import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export const Layout = () => {
  return (
    <div>
      <div style={{ backgroundColor: "pink" }}>
        <Sidebar />
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
